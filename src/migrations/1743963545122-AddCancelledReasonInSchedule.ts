import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddCancelledReasonInSchedule1743963545122 implements MigrationInterface {
  name = 'AddCancelledReasonInSchedule1743963545122';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "schedules" ADD "cancelled_reason" character varying(255)`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "schedules" DROP COLUMN "cancelled_reason"`);
  }
}
