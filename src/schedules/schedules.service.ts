import { HttpException, Injectable } from '@nestjs/common';
import { CreateSchedulesDto } from './dto/create-schedules.dto';
import { Schedule } from './entity/schedules';
import { ScheduleRepository } from './repository/schedules.repository';
import { PlaceConfigurationRepository } from 'src/place-configurations/repository/place-configuration.repository';
import { UserRepository } from 'src/users/repository/user.repository';
import { EUserType } from 'src/users/entity/euser-type';

@Injectable()
export class SchedulesService {
  constructor(
    private readonly schedulesRepository: ScheduleRepository,
    private readonly placeConfigurationsRepository: PlaceConfigurationRepository,
    private readonly userRepository: UserRepository,
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
    return schedule.toJSON();
  }

  async cancel(id_schedule: number, id_user_cancelled: number) {
    const schedule = await this.schedulesRepository.findById(id_schedule);
    const user = await this.userRepository.findById(id_user_cancelled);
    if (schedule.date_cancelled) return true;

    if (schedule.id_user_requested !== id_user_cancelled && user.type !== EUserType.ADMIN) {
      throw new HttpException('Você não tem permissão para cancelar este agendamento', 403);
    }

    schedule.cancel(id_user_cancelled);
    await this.schedulesRepository.update(schedule);

    return true;
  }

  async findAll(userId: number) {
    const data = await this.schedulesRepository.findAllByUser(userId);
    return data.map((item) => item.toJSON());
  }
}
