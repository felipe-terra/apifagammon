import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddColumnInSchedule1748554450388 implements MigrationInterface {
  name = 'AddColumnInSchedule1748554450388';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "schedules" ADD "already_notified" boolean NOT NULL`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "schedules" DROP COLUMN "already_notified"`);
  }
}
