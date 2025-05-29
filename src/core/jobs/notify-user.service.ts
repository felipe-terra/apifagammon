import { Injectable } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { ScheduleRepository } from 'src/schedules/repository/schedules.repository';
import { EmailSenderService } from '../communication/email/email-sender.service';
import { getTodayAppointmentReminderTemplate } from '../communication/email/templates/notify-user';

@Injectable()
export class NotifyUserService {
  constructor(
    private readonly scheduleRepository: ScheduleRepository,
    private readonly emailSenderService: EmailSenderService,
  ) {}

  @Cron(CronExpression.EVERY_DAY_AT_8AM)
  async handleCron() {
    const schedules = await this.scheduleRepository.findAllToday();
    for (const schedule of schedules) {
      await this.emailSenderService.sendMail({
        to: schedule.user_requested.email,
        subject: 'Lembrete de agendamento',
        text: 'Lembrete de agendamento',
        body: getTodayAppointmentReminderTemplate(
          schedule.user_requested.name,
          schedule.place_configuration.start_time.slice(0, 5),
          schedule.place_configuration.place.name,
        ),
      });

      schedule.already_notified = true;
      await this.scheduleRepository.update(schedule);
    }
  }
}
