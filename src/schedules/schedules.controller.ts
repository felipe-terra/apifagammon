import { ApiQuery, ApiTags } from '@nestjs/swagger';
import { JwtGuard } from 'src/auth/jwt-strategy/jwt.guard';
import { CreateSchedulesDto } from './dto/create-schedules.dto';
import { SchedulesService } from './schedules.service';
import { Body, Controller, Get, Param, Patch, Post, Query, Req, UseGuards } from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';
import { CancelSchedulesDto } from './dto/cancel-schedules.dto';
import { FilterDto } from 'src/core/dto/filter.dto';
import { SubscribeSchedulesDto } from './dto/subscribe-schedules.dto';

@ApiTags('Schedules')
@Controller('schedules')
export class SchedulesController {
  constructor(private readonly schedulesService: SchedulesService) {}

  @ApiBearerAuth('JWT')
  @UseGuards(JwtGuard)
  @Post()
  async create(@Body() scheduleDto: CreateSchedulesDto, @Req() request: any) {
    scheduleDto.id_user_requested = request.user.sub;
    return this.schedulesService.create(scheduleDto);
  }

  @ApiBearerAuth('JWT')
  @UseGuards(JwtGuard)
  @Patch('cancel/:id')
  async cancel(@Body() scheduleDto: CancelSchedulesDto, @Param('id') id: number, @Req() request: any) {
    scheduleDto.id_user_cancelled = request.user.sub;
    return this.schedulesService.cancel(id, scheduleDto);
  }

  @ApiBearerAuth('JWT')
  @UseGuards(JwtGuard)
  @Get('by-user')
  async findAllByUser(@Req() request: any) {
    return this.schedulesService.findAllByUser(request.user.sub);
  }

  @ApiBearerAuth('JWT')
  @UseGuards(JwtGuard)
  @Get()
  async findAll() {
    return this.schedulesService.findAll();
  }


  @Post('subscribe')
  async subscribe(@Body() subscribeDto: SubscribeSchedulesDto) {
    return this.schedulesService.subscribe(subscribeDto);
  }

  @ApiQuery({ name: 'page', required: false })
  @ApiQuery({ name: 'recordsPerPage', required: false })
  @ApiQuery({ name: 'filter', required: false })
  @Get('public')
  async findAllPublic(
    @Query('page') page: number,
    @Query('recordsPerPage') recordsPerPage: number,
    @Query('filter') filter: FilterDto[],
  ) {
    return this.schedulesService.findAllPublic({ page, recordsPerPage }, filter);
  }
}
