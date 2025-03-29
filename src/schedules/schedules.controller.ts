import { ApiTags } from '@nestjs/swagger';
import { JwtGuard } from 'src/auth/jwt-strategy/jwt.guard';
import { CreateSchedulesDto } from './dto/create-schedules.dto';
import { SchedulesService } from './schedules.service';
import { Body, Controller, Get, Param, Patch, Post, Req, UseGuards } from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';

@ApiBearerAuth('JWT')
@UseGuards(JwtGuard)
@ApiTags('Schedules')
@Controller('schedules')
export class SchedulesController {
  constructor(private readonly schedulesService: SchedulesService) {}

  @Post()
  async create(@Body() scheduleDto: CreateSchedulesDto, @Req() request: any) {
    scheduleDto.id_user_requested = request.user.sub;
    return this.schedulesService.create(scheduleDto);
  }

  @Patch('cancel/:id')
  async cancel(@Param('id') id: number, @Req() request: any) {
    return this.schedulesService.cancel(id, request.user.sub);
  }

  @Get('by-user')
  async findAllByUser(@Req() request: any) {
    return this.schedulesService.findAllByUser(request.user.sub);
  }

  @Get()
  async findAll() {
    return this.schedulesService.findAll();
  }
}
