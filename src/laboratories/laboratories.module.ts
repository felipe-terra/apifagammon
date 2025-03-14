import { Module } from '@nestjs/common';
import { LaboratoriesController } from './laboratories.controller';
import { LaboratoriesService } from './laboratories.service';

@Module({
  controllers: [LaboratoriesController],
  providers: [LaboratoriesService]
})
export class LaboratoriesModule {}
