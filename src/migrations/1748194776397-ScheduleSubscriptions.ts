import { MigrationInterface, QueryRunner } from "typeorm";

export class ScheduleSubscriptions1748194776397 implements MigrationInterface {
    name = 'ScheduleSubscriptions1748194776397'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."schedule_subscriptions_status_enum" AS ENUM('ACTIVE', 'CANCELLED')`);
        await queryRunner.query(`CREATE TABLE "schedule_subscriptions" ("id" SERIAL NOT NULL, "id_schedule" integer NOT NULL, "name" character varying(255) NOT NULL, "email" character varying(255) NOT NULL, "phone" character varying(20) NOT NULL, "subscribed_at" TIMESTAMP NOT NULL DEFAULT now(), "status" "public"."schedule_subscriptions_status_enum" NOT NULL DEFAULT 'ACTIVE', CONSTRAINT "PK_a66eb8242d2aa2e6b5085a1809e" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "schedule_subscriptions" ADD CONSTRAINT "FK_c2fed17e2e0491808e1a835d721" FOREIGN KEY ("id_schedule") REFERENCES "schedules"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "schedule_subscriptions" DROP CONSTRAINT "FK_c2fed17e2e0491808e1a835d721"`);
        await queryRunner.query(`DROP TABLE "schedule_subscriptions"`);
        await queryRunner.query(`DROP TYPE "public"."schedule_subscriptions_status_enum"`);
    }

}
