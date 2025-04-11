import { MigrationInterface, QueryRunner } from "typeorm";

export class GlobalBlock1744310449668 implements MigrationInterface {
    name = 'GlobalBlock1744310449668'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "global_blocks" ("id" SERIAL NOT NULL, "date" date NOT NULL, "id_place_configuration" integer NOT NULL, "id_user_blocking" integer NOT NULL, "reason" character varying(255) NOT NULL, "created_at" TIMESTAMP NOT NULL, CONSTRAINT "PK_424308ef1b8116288a2090938c0" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "global_blocks" ADD CONSTRAINT "FK_d8b43933273e3bdb8e7b87f608e" FOREIGN KEY ("id_place_configuration") REFERENCES "place_configurations"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "global_blocks" DROP CONSTRAINT "FK_d8b43933273e3bdb8e7b87f608e"`);
        await queryRunner.query(`DROP TABLE "global_blocks"`);
    }

}
