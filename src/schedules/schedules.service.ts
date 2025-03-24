import { Injectable } from '@nestjs/common';
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
    await this.placeConfigurationsRepository.findById(
      scheduleDto.id_place_configuration,
    );
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

  async findAll() {
    return this.schedulesRepository.findAllWithDetails();
  }
}
