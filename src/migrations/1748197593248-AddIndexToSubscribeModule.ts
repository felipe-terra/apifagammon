import { MigrationInterface, QueryRunner } from "typeorm";

export class AddIndexToSubscribeModule1748197593248 implements MigrationInterface {
    name = 'AddIndexToSubscribeModule1748197593248'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE INDEX "IDX_SCHEDULE_SUBSCRIPTION_SCHEDULE" ON "schedule_subscriptions" ("id_schedule") `);
        await queryRunner.query(`CREATE INDEX "IDX_SCHEDULE_SUBSCRIPTION_EMAIL" ON "schedule_subscriptions" ("email") `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX "public"."IDX_SCHEDULE_SUBSCRIPTION_EMAIL"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_SCHEDULE_SUBSCRIPTION_SCHEDULE"`);
    }

}
