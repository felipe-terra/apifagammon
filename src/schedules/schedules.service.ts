import { HttpException, Injectable } from '@nestjs/common';
import { CreateSchedulesDto } from './dto/create-schedules.dto';
import { Schedule } from './entity/schedules';
import { ScheduleRepository } from './repository/schedules.repository';
import { PlaceConfigurationRepository } from 'src/place-configurations/repository/place-configuration.repository';
import { UserRepository } from 'src/users/repository/user.repository';
import { EUserType } from 'src/users/entity/euser-type';
import { EmailSenderService } from 'src/core/communication/email/email-sender.service';

@Injectable()
export class SchedulesService {
  constructor(
    private readonly schedulesRepository: ScheduleRepository,
    private readonly placeConfigurationsRepository: PlaceConfigurationRepository,
    private readonly userRepository: UserRepository,
    private readonly emailSenderService: EmailSenderService,
  ) {}

  async create(scheduleDto: CreateSchedulesDto) {
    const alreadyScheduled = await this.schedulesRepository.alreadyScheduled(
      scheduleDto.id_place_configuration,
      scheduleDto.date.toString(),
    );
    if (alreadyScheduled) {
      throw new HttpException('Já existe um agendamento para este horário', 400);
    }

    const placeConfigurations = await this.placeConfigurationsRepository.findById(
      scheduleDto.id_place_configuration,
    );
    const now = new Date();
    const scheduleDate = new Date(scheduleDto.date + ' ' + placeConfigurations.start_time);
    if (scheduleDate < now) {
      throw new HttpException('A data do agendamento deve ser maior que a data atual', 400);
    }

    const schedule = Schedule.newSchedule(scheduleDto);
    await this.schedulesRepository.create(schedule);

    const scheduleInDb = await this.schedulesRepository.findById(schedule.id);
    const user = await this.userRepository.findById(scheduleDto.id_user_requested);
    await this.emailSenderService.sendMail({
      to: user.email,
      subject: 'Agendamento realizado',
      text: 'Seu agendamento foi realizado com sucesso',
      body: scheduleInDb.getTemplate('agendado'),
    });

    return schedule.toJSON();
  }

  async cancel(id_schedule: number, id_user_cancelled: number) {
    const schedule = await this.schedulesRepository.findById(id_schedule);
    const user_cancelled = await this.userRepository.findById(id_user_cancelled);
    if (schedule.date_cancelled) return true;

    if (schedule.id_user_requested !== id_user_cancelled && user_cancelled.type !== EUserType.ADMIN) {
      throw new HttpException('Você não tem permissão para cancelar este agendamento', 403);
    }

    schedule.cancel(id_user_cancelled);
    await this.schedulesRepository.update(schedule);

    const scheduleInDb = await this.schedulesRepository.findById(id_schedule);
    const user_requested = await this.userRepository.findById(schedule.id_user_requested);
    await this.emailSenderService.sendMail({
      to: user_requested.email,
      subject: 'Agendamento cancelado',
      text: 'Seu agendamento foi cancelado com sucesso',
      body: scheduleInDb.getTemplate('cancelado'),
    });

    return true;
  }

  async findAllByUser(userId: number) {
    const data = await this.schedulesRepository.findAllByUser(userId);
    return data.map((item) => item.toJSON());
  }

  async findAll() {
    const data = await this.schedulesRepository.findAll();
    return data.map((item) => item.toAdminJSON());
  }

  async findAllPublic() {
    const data = await this.schedulesRepository.findAllPublic();
    return data.map((item) => item.toPublicJSON());
  }
}
