import { EntitySchema } from "typeorm";
import { GlobalBlock } from "../entity/global_block";


export const GlobalBlockSchema = new EntitySchema<GlobalBlock>({
    name: 'global_blocks',
    tableName: 'global_blocks',
    target: GlobalBlock,
    columns: {
        id: {
            type: 'int',
            primary: true,
            generated: true,
        },
        date: {
            type: 'date',
            nullable: false,
        },
        id_place_configuration: {
            type: 'int',
            nullable: false,
        },
        id_user_blocking: {
            type: 'int',
            nullable: false,
        },
        reason: {
            type: 'varchar',
            length: 255,
            nullable: false,
        },
        created_at: {
            type: 'timestamp',
            nullable: false,
        }
    },
    relations: {
        place_configuration: {
            type: 'many-to-one',
            target: 'place_configurations',
            joinColumn: { name: 'id_place_configuration' },
            inverseSide: 'global_blocks',
        },
    },
});