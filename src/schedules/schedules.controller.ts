import { ApiTags } from "@nestjs/swagger";
import { JwtGuard } from "src/auth/jwt-strategy/jwt.guard";
import { CreateSchedulesDto } from "./dto/create-schedules.dto";
import { SchedulesService } from "./schedules.service";
import { Body, Controller, Get, Post, UseGuards } from "@nestjs/common";
import { ApiBearerAuth } from "@nestjs/swagger";


@ApiBearerAuth('JWT')
@UseGuards(JwtGuard)
@ApiTags('Schedules')
@Controller('schedules')
export class SchedulesController {
  constructor(private readonly schedulesService: SchedulesService) {}

  @Post()
  async create(@Body() scheduleDto: CreateSchedulesDto) {
    return this.schedulesService.create(scheduleDto);
  }

  @Post('cancel')
  async cancel(@Body() scheduleDto: CreateSchedulesDto) {
    return this.schedulesService.cancel(scheduleDto);
  }

  @Get()
  async findAll() {
    return this.schedulesService.findAll();
  }
}
