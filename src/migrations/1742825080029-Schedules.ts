import { MigrationInterface, QueryRunner } from 'typeorm';

export class Schedules1742825080029 implements MigrationInterface {
  name = 'Schedules1742825080029';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TYPE "public"."schedules_status_enum" AS ENUM('AGENDADO', 'CANCELADO')`,
    );
    await queryRunner.query(
      `CREATE TABLE "schedules" ("id" SERIAL NOT NULL, "id_user_requested" integer NOT NULL, "id_place_configuration" integer NOT NULL, "date" date NOT NULL, "status" "public"."schedules_status_enum" NOT NULL, "id_user_cancelled" integer, "date_cancelled" TIMESTAMP, "created_at" TIMESTAMP NOT NULL, "reason" character varying(255) NOT NULL, CONSTRAINT "PK_7e33fc2ea755a5765e3564e66dd" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "schedules" ADD CONSTRAINT "FK_c66c3667a2fa5705a82850400b4" FOREIGN KEY ("id_user_requested") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "schedules" ADD CONSTRAINT "FK_c69c237fb1b56264d174a759fdc" FOREIGN KEY ("id_user_cancelled") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "schedules" ADD CONSTRAINT "FK_fb6c27d0728ae69cbe0c6647d3a" FOREIGN KEY ("id_place_configuration") REFERENCES "place_configurations"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "schedules" DROP CONSTRAINT "FK_fb6c27d0728ae69cbe0c6647d3a"`,
    );
    await queryRunner.query(
      `ALTER TABLE "schedules" DROP CONSTRAINT "FK_c69c237fb1b56264d174a759fdc"`,
    );
    await queryRunner.query(
      `ALTER TABLE "schedules" DROP CONSTRAINT "FK_c66c3667a2fa5705a82850400b4"`,
    );
    await queryRunner.query(`DROP TABLE "schedules"`);
    await queryRunner.query(`DROP TYPE "public"."schedules_status_enum"`);
  }
}
