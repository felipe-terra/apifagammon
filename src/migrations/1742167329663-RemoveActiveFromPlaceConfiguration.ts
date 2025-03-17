import { MigrationInterface, QueryRunner } from 'typeorm';

export class RemoveActiveFromPlaceConfiguration1742167329663
  implements MigrationInterface
{
  name = 'RemoveActiveFromPlaceConfiguration1742167329663';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "place_configurations" DROP COLUMN "active"`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "place_configurations" ADD "active" boolean NOT NULL`,
    );
  }
}
