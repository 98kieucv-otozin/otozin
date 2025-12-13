import { Controller, Post, Get, HttpCode, HttpStatus, UseGuards, Query } from '@nestjs/common';
import { TypesenseSyncService } from './typesense-sync.service';
import { JwtAuthGuard, RoleGuard } from '../../shared/guards';
import { Roles } from '../../common/decorators';
import { UserRole } from '../../common/interfaces/user.interface';
import { SearchDto } from './dto/search.dto';

@Controller('search')
export class SearchController {
  constructor(private readonly typesenseSyncService: TypesenseSyncService) { }

  @Get('car-models')
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Roles(UserRole.GUEST)
  @HttpCode(HttpStatus.OK)
  async search(@Query() searchDto: SearchDto) {
    const results = await this.typesenseSyncService.searchCarModels(
      searchDto.query || '',
      searchDto.page,
      searchDto.per_page,
    );

    return {
      success: true,
      data: results,
    };
  }

  @Post('sync')
  @UseGuards(JwtAuthGuard, RoleGuard) // JwtAuthGuard chạy trước để authenticate
  @Roles(UserRole.ADMIN) // Sau đó RoleGuard check quyền
  @HttpCode(HttpStatus.OK)
  async syncAllJsonMaster() {
    await this.typesenseSyncService.syncAllJsonMaster();
    return {
      success: true,
      message: 'Typesense sync completed successfully',
    };
  }
}

