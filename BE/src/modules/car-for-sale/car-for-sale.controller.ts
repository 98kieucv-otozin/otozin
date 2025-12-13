import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Param,
    Delete,
    UseGuards,
    Query,
    HttpCode,
    HttpStatus,
} from '@nestjs/common';
import { CarForSaleService } from './car-for-sale.service';
import { CreateCarForSaleDto, UpdateCarForSaleDto } from './dto';
import { JwtAuthGuard, RoleGuard } from '../../shared/guards';
import { CurrentUser, Roles } from '../../common/decorators';
import { UserPayload, UserRole } from '../../common/interfaces';

@Controller('car-for-sale')
export class CarForSaleController {
    constructor(private readonly carForSaleService: CarForSaleService) { }

    @Post()
    @UseGuards(JwtAuthGuard, RoleGuard)
    @Roles(UserRole.DEALER)
    @HttpCode(HttpStatus.CREATED)
    create(@CurrentUser() user: UserPayload, @Body() createDto: CreateCarForSaleDto) {
        return this.carForSaleService.create(user.sub, createDto);
    }

    @Get()
    findAll(
        @Query('status') status?: string,
        @Query('sellerId') sellerId?: string,
        @Query('limit') limit?: string,
        @Query('offset') offset?: string,
    ) {
        return this.carForSaleService.findAll({
            status,
            sellerId: sellerId ? parseInt(sellerId, 10) : undefined,
            limit: limit ? parseInt(limit, 10) : undefined,
            offset: offset ? parseInt(offset, 10) : undefined,
        });
    }

    @Get('/dealer')
    @UseGuards(JwtAuthGuard, RoleGuard)
    @Roles(UserRole.DEALER)
    findAllBySeller(
        @Query('status') status?: string,
        @Query('sellerId') sellerId?: string,
        @Query('limit') limit?: string,
        @Query('offset') offset?: string,
    ) {
        return this.carForSaleService.findAll({
            status,
            sellerId: sellerId ? parseInt(sellerId, 10) : undefined,
            limit: limit ? parseInt(limit, 10) : undefined,
            offset: offset ? parseInt(offset, 10) : undefined,
        });
    }

    @Get('search')
    @UseGuards(JwtAuthGuard, RoleGuard)
    @Roles(UserRole.DEALER)
    async searchBySeller(
        @CurrentUser() user: UserPayload,
        @Query('query') query?: string,
        @Query('status') status?: string,
        @Query('sellerId') sellerId?: string,
        @Query('page') page?: string,
        @Query('perPage') perPage?: string,
    ) {
        // Nếu không có sellerId trong query, dùng sellerId từ token
        const targetSellerId = sellerId ? parseInt(sellerId, 10) : user.sub;

        return this.carForSaleService.findAllBySellerFromTypesense(
            targetSellerId,
            query,
            status,
            page ? parseInt(page, 10) : 1,
            perPage ? parseInt(perPage, 10) : 10,
        );
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.carForSaleService.findOne(parseInt(id, 10));
    }

    @Patch(':id')
    @UseGuards(JwtAuthGuard)
    update(
        @CurrentUser() user: UserPayload,
        @Param('id') id: string,
        @Body() updateDto: UpdateCarForSaleDto,
    ) {
        return this.carForSaleService.update(parseInt(id, 10), user.sub, updateDto);
    }

    @Delete(':id')
    @UseGuards(JwtAuthGuard)
    @HttpCode(HttpStatus.NO_CONTENT)
    remove(@CurrentUser() user: UserPayload, @Param('id') id: string) {
        return this.carForSaleService.remove(parseInt(id, 10), user.sub);
    }
}

