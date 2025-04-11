import { GlobalBlockRepository } from "./repository/global_block.repository";
import { CreateGlobalBlockDto } from "./dto/create-global_block.dto";
import { HttpException, Injectable } from "@nestjs/common";
import { GlobalBlock } from "./entity/global_block";

@Injectable()
export class GlobalBlockService{
    constructor(
        private readonly globalBlockRepository: GlobalBlockRepository,
    ) {}

    async create(globalBlockDto: CreateGlobalBlockDto) {
        const alreadyBlocked = await this.globalBlockRepository.alreadyBlocked(globalBlockDto.id_place_configuration, globalBlockDto.date.toString());
        if (alreadyBlocked) {
            throw new HttpException('Já existe um bloqueio para este horário', 400);
        }


        const block = GlobalBlock.newGlobalBlock(globalBlockDto);
        await this.globalBlockRepository.create(block);
    }

    async cancelBlock(id: number) {
        const block = await this.globalBlockRepository.findById(id);
        if (!block) {
            throw new HttpException('Bloqueio não encontrado', 404);
        }
        await this.globalBlockRepository.delete(id);
    }

}