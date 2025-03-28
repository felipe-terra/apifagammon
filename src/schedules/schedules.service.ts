import { HttpException, Injectable } from '@nestjs/common';
import { CreateSchedulesDto } from './dto/create-schedules.dto';
import { Schedule } from './entity/schedules';
import { ScheduleRepository } from './repository/schedules.repository';
import { PlaceConfigurationRepository } from 'src/place-configurations/repository/place-configuration.repository';

@Injectable()
export class SchedulesService {
  constructor(
    private readonly schedulesRepository: ScheduleRepository,
    private readonly placeConfigurationsRepository: PlaceConfigurationRepository,
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

  //TODO: Fazer a parte do cancelamento depois
  async cancel(scheduleDto: CreateSchedulesDto) {
    const schedule = Schedule.cancelSchedule(scheduleDto);
    await this.schedulesRepository.update(schedule);
    return schedule.toJSON();
  }

  async findAll(userId: number) {
    const data = await this.schedulesRepository.findAllByUser(userId);
    return data.map((item) => item.toJSON());
  }
}
