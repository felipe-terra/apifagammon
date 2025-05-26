import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { SchedulesService } from "./schedules.service";
import { SchedulesController } from "./schedules.controller";
import { ScheduleSubscriptionSchema } from "./schema/schedule-subscription.schema";

@Module({
  imports: [
    TypeOrmModule.forFeature([ScheduleSubscriptionSchema])
  ],
  controllers: [SchedulesController],
  providers: [SchedulesService],
})
export class SchedulesModule {}
