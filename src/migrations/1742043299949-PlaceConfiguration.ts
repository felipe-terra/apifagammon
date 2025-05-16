import { MigrationInterface, QueryRunner } from 'typeorm';

export class PlaceConfiguration1742043299949 implements MigrationInterface {
  name = 'PlaceConfiguration1742043299949';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TYPE "public"."place_configurations_day_of_week_enum" AS ENUM('DOMINGO', 'SEGUNDA', 'TERCA', 'QUARTA', 'QUINTA', 'SEXTA', 'SABADO')`,
    );
    await queryRunner.query(
      `CREATE TABLE "place_configurations" ("id" SERIAL NOT NULL, "id_place" integer NOT NULL, "day_of_week" "public"."place_configurations_day_of_week_enum" NOT NULL, "start_time" TIME NOT NULL, "end_time" TIME NOT NULL, "order" integer NOT NULL, "active" boolean NOT NULL, CONSTRAINT "PK_172c25500c4fdb8741a685287e1" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "place_configurations" ADD CONSTRAINT "FK_3880be9696b4ead3c2dac556a0c" FOREIGN KEY ("id_place") REFERENCES "places"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "place_configurations" DROP CONSTRAINT "FK_3880be9696b4ead3c2dac556a0c"`,
    );
    await queryRunner.query(`DROP TABLE "place_configurations"`);
    await queryRunner.query(
      `DROP TYPE "public"."place_configurations_day_of_week_enum"`,
    );
  }
}
