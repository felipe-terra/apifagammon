import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ScheduleSubscription } from '../entity/schedule-subscription';
import { GenericRepository } from 'src/core/repository/generic.repository';

@Injectable()
export class ScheduleSubscriptionRepository extends GenericRepository<ScheduleSubscription> {
  entityName = 'ScheduleSubscription';
  constructor(
    @InjectRepository(ScheduleSubscription)
    private readonly scheduleSubscriptionRepository: Repository<ScheduleSubscription>,
  ) {
    super(scheduleSubscriptionRepository);
  }

  async findByScheduleId(scheduleId: number): Promise<ScheduleSubscription[]> {
    return this.scheduleSubscriptionRepository.find({
      where: { id_schedule: scheduleId, status: 'ACTIVE' },
      order: { subscribed_at: 'DESC' },
    });
  }

  async findByEmailAndSchedule(email: string, scheduleId: number): Promise<ScheduleSubscription | null> {
    return this.scheduleSubscriptionRepository.findOne({
      where: { email, id_schedule: scheduleId, status: 'ACTIVE' },
    });
  }
}