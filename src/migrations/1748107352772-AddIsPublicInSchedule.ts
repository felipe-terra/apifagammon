import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddIsPublicInSchedule1748107352772 implements MigrationInterface {
  name = 'AddIsPublicInSchedule1748107352772';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "schedules" ADD "is_public" boolean NOT NULL`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "schedules" DROP COLUMN "is_public"`);
  }
}
