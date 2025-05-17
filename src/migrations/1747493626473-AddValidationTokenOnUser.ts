import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddValidationTokenOnUser1747493626473 implements MigrationInterface {
  name = 'AddValidationTokenOnUser1747493626473';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "users" ADD "validate_token" character varying(100)`);
    await queryRunner.query(`ALTER TABLE "users" ADD "validate_token_expiration" TIMESTAMP`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "validate_token_expiration"`);
    await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "validate_token"`);
  }
}
