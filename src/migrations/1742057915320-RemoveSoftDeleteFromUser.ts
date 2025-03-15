import { MigrationInterface, QueryRunner } from 'typeorm';

export class RemoveSoftDeleteFromUser1742057915320
  implements MigrationInterface
{
  name = 'RemoveSoftDeleteFromUser1742057915320';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "deleted_at"`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "users" ADD "deleted_at" TIMESTAMP`);
  }
}
