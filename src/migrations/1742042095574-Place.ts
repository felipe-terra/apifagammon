import { MigrationInterface, QueryRunner } from 'typeorm';

export class Place1742042095574 implements MigrationInterface {
  name = 'Place1742042095574';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "places" ("id" SERIAL NOT NULL, "name" character varying(100) NOT NULL, "active" boolean NOT NULL, CONSTRAINT "PK_1afab86e226b4c3bc9a74465c12" PRIMARY KEY ("id"))`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "places"`);
  }
}
