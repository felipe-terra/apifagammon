import { Entity } from "src/core/repository/generic.repository";
import { PlaceConfiguration } from "src/place-configurations/entity/place-configurations";

export class GlobalBlock implements Entity {
    id: number;
    date: Date;
    id_place_configuration: number;
    id_user_blocking: number;
    place_configuration: PlaceConfiguration;
    reason: string;
    created_at: Date;

    constructor(partial: Partial<GlobalBlock>) {
        Object.assign(this, partial);
    }

    static newGlobalBlock(data: Partial<GlobalBlock>): GlobalBlock {
        const input: Partial<GlobalBlock> = {
            date: data.date,
            id_user_blocking: data.id_user_blocking,
            id_place_configuration: data.id_place_configuration,
            reason: data.reason,
            created_at: new Date(),
        };
        const globalBlock = new GlobalBlock(input);
        return globalBlock;
    }
}