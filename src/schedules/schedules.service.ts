import { HttpException, Injectable } from '@nestjs/common';
import { CreateSchedulesDto } from './dto/create-schedules.dto';
import { Schedule } from './entity/schedules';
import { ScheduleRepository } from './repository/schedules.repository';
import { PlaceConfigurationRepository } from 'src/place-configurations/repository/place-configuration.repository';
import { UserRepository } from 'src/users/repository/user.repository';
import { EUserType } from 'src/users/entity/euser-type';
import { EmailSenderService } from 'src/core/communication/email/email-sender.service';
import { CancelSchedulesDto } from './dto/cancel-schedules.dto';
import { RequestPaginationDto } from 'src/core/dto/request-pagination.dto';
import { FilterDto } from 'src/core/dto/filter.dto';
import { ScheduleSubscription } from './entity/schedule-subscription';
import { ScheduleSubscriptionRepository } from './repository/schedule-subscription.repository';
import { SubscribeSchedulesDto } from './dto/subscribe-schedules.dto';
import { FileManager } from 'src/core/file-manager/file-manager';
import { promises as pfs } from 'fs';

@Injectable()
export class SchedulesService {
  constructor(
    private readonly schedulesRepository: ScheduleRepository,
    private readonly placeConfigurationsRepository: PlaceConfigurationRepository,
    private readonly userRepository: UserRepository,
    private readonly emailSenderService: EmailSenderService,
    private readonly subscriptionRepository: ScheduleSubscriptionRepository,
    private readonly fileManager: FileManager,
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

    const block = await this.schedulesRepository.isBlocked(scheduleDto.id_place_configuration);
    if (block) {
      throw new HttpException('Esse local está bloqueado', 400);
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

  async cancel(id_schedule: number, scheduleDto: CancelSchedulesDto) {
    const schedule = await this.schedulesRepository.findById(id_schedule);
    const user_cancelled = await this.userRepository.findById(scheduleDto.id_user_cancelled);
    if (schedule.date_cancelled) return true;

    if (
      schedule.id_user_requested !== scheduleDto.id_user_cancelled &&
      user_cancelled.type !== EUserType.ADMIN
    ) {
      throw new HttpException('Você não tem permissão para cancelar este agendamento', 403);
    }

    schedule.cancel(scheduleDto);
    await this.schedulesRepository.update(schedule);

    const scheduleInDb = await this.schedulesRepository.findById(id_schedule);
    const user_requested = await this.userRepository.findById(schedule.id_user_requested);
    await this.emailSenderService.sendMail({
      to: user_requested.email,
      subject: 'Agendamento cancelado',
      text: 'Seu agendamento foi cancelado',
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

  async findAllPublic(props: RequestPaginationDto, filter: FilterDto[]) {
    const data = await this.schedulesRepository.findAllPublic(props, filter);
    return {
      data: data.data.map((item) => item.toPublicJSON()),
      totalRecords: data.totalRecords,
    };
  }

  async subscribe(subscribeDto: SubscribeSchedulesDto) {
    const schedule = await this.schedulesRepository.findById(subscribeDto.id_schedule);
    if (!schedule) {
      throw new HttpException('Agendamento não encontrado', 404);
    }

    if (!schedule.is_public) {
      throw new HttpException('Este agendamento não está disponível para inscrições públicas', 400);
    }

    if (schedule.status !== 'AGENDADO') {
      throw new HttpException('Este agendamento não está mais disponível', 400);
    }

    const existingSubscription = await this.subscriptionRepository.findByEmailAndSchedule(
      subscribeDto.email,
      subscribeDto.id_schedule,
    );
    if (existingSubscription) {
      throw new HttpException('Você já está inscrito neste agendamento', 400);
    }

    const now = new Date();
    const scheduleDate = new Date(schedule.date + ' ' + schedule.place_configuration.start_time);

    if (scheduleDate < now) {
      throw new HttpException('Este agendamento já passou', 400);
    }

    const subscription = ScheduleSubscription.newSubscription(subscribeDto);
    await this.subscriptionRepository.create(subscription);

    return {
      message: 'Inscrição realizada com sucesso',
      subscription_id: subscription.id,
      schedule_id: schedule.id,
      subscriber: {
        name: subscribeDto.name,
        email: subscribeDto.email,
        phone: subscribeDto.phone,
      },
    };
  }

  async downloadAllSubscriptionsBySchedule(id_schedule: number, userId: number) {
    const schedule = await this.schedulesRepository.findById(id_schedule);
    const user = await this.userRepository.findById(userId);
    if (
      schedule.id_user_requested !== userId &&
      schedule.status !== 'AGENDADO' &&
      user.type !== EUserType.ADMIN
    ) {
      throw new HttpException('Você não tem permissão para acessar as inscrições deste agendamento', 403);
    }

    const subscriptions = await this.subscriptionRepository.findByScheduleId(id_schedule);
    const csvData = ScheduleSubscription.toCsv(subscriptions);

    await pfs.writeFile('./files/csv/incricoes.csv', csvData);
    const baseb4 = await this.fileManager.FileToBase64('csv/incricoes.csv');
    await this.fileManager.DeleteFile('csv/incricoes.csv');

    return {
      file: baseb4,
      filename: `inscricoes-${schedule.id}-${new Date().toISOString()}.csv`,
    };
  }
}
