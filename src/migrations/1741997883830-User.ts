import { MigrationInterface, QueryRunner } from 'typeorm';

export class User1741997883830 implements MigrationInterface {
  name = 'User1741997883830';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TYPE "public"."users_type_enum" AS ENUM('ADMIN', 'USER')`,
    );
    await queryRunner.query(
      `CREATE TABLE "users" ("id" SERIAL NOT NULL, "name" character varying(100) NOT NULL, "email" character varying(100) NOT NULL, "password" character varying(100) NOT NULL, "type" "public"."users_type_enum" NOT NULL, "active" boolean NOT NULL, "created_at" TIMESTAMP NOT NULL, "deleted_at" TIMESTAMP, CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "users"`);
    await queryRunner.query(`DROP TYPE "public"."users_type_enum"`);
  }
}
