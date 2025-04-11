import { GenericRepository } from "src/core/repository/generic.repository";
import { GlobalBlock } from "../entity/global_block";
import { FindOptionsOrder, Repository } from 'typeorm';
import { Injectable } from "@nestjs/common";

@Injectable()
export class GlobalBlockRepository extends GenericRepository<GlobalBlock> {
    entityName: string = 'GlobalBlock';
    relations: string[] = ['place_configuration'];
    relationEager: boolean = true;

    constructor(public repository: Repository<GlobalBlock>) {
        super(repository);
    }

    async alreadyBlocked(id_place_configuration: number, date: string): Promise<boolean> {
        const sql = `
            SELECT COUNT(*) FROM global_blocks
            WHERE id_place_configuration = $1 AND date = $2
        `;
        const result = await this.repository.query(sql, [id_place_configuration, date]);

        return result[0].count > 0;
    }

}