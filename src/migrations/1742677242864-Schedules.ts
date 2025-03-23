import { MigrationInterface, QueryRunner } from "typeorm";

export class Schedules1742677242864 implements MigrationInterface {
    name = 'Schedules1742677242864'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "schedules" ("id" SERIAL NOT NULL, "id_user_requested" integer NOT NULL, "id_place_configuration" integer NOT NULL, "date" TIMESTAMP NOT NULL, "status" character varying(100) NOT NULL, "start" character varying(5) NOT NULL, "end" character varying(5) NOT NULL, "id_user_cancelled" integer, "date_cancelled" TIMESTAMP, "created_at" TIMESTAMP NOT NULL, "reason" character varying(255), CONSTRAINT "PK_7e33fc2ea755a5765e3564e66dd" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "schedules"`);
    }

}
