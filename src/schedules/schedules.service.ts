import { HttpException, Injectable } from "@nestjs/common";
import { CreateSchedulesDto } from "./dto/create-schedules.dto";
import { Schedule } from "./entity/schedules";
import { ScheduleRepository } from "./repository/schedules.repository";
import { PlaceRepository } from "src/places/repository/place.repository";

@Injectable()
export class SchedulesService {
  constructor(
    private readonly schedulesRepository: ScheduleRepository,
    private readonly placeRepository: PlaceRepository
  ) {}

  async create(scheduleDto: CreateSchedulesDto) {
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
