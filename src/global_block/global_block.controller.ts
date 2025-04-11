import { Body, Controller, Delete, Param, Post, Req, UseGuards } from "@nestjs/common";
import { CreateGlobalBlockDto } from "./dto/create-global_block.dto";
import { GlobalBlockService } from "./global_block.service";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { JwtGuard } from "src/auth/jwt-strategy/jwt.guard";

@ApiTags('Global Block')
@Controller('global-block') 
@ApiBearerAuth('JWT')
@UseGuards(JwtGuard)
export class GlobalBlockController {
    constructor(private readonly globalBlockService: GlobalBlockService) {}

    @Post()
    async create(@Body() globalBlockDto: CreateGlobalBlockDto, @Req() request: any) {
        globalBlockDto.id_user_blocking = request.user.sub;
        return this.globalBlockService.create(globalBlockDto);
    }

    @Delete(':id')
    async cancelBlock(@Param('id') id: number) {
        return this.globalBlockService.cancelBlock(id);
    }
}
