import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddColumnsInPlace1747269112041 implements MigrationInterface {
  name = 'AddColumnsInPlace1747269112041';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "places" ADD "people_capacity" integer NOT NULL`);
    await queryRunner.query(`ALTER TABLE "places" ADD "photo" character varying(255)`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "places" DROP COLUMN "photo"`);
    await queryRunner.query(`ALTER TABLE "places" DROP COLUMN "people_capacity"`);
  }
}
