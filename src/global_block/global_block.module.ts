import { Module } from "@nestjs/common";
import { GlobalBlockController } from "./global_block.controller";
import { GlobalBlockService } from "./global_block.service";

@Module({
    controllers: [GlobalBlockController],
    providers: [GlobalBlockService],
})
export class GlobalBlockModule {}