import { Controller, Get, HttpStatus, Param, Query } from '@nestjs/common';
import { MovieService } from './movie.service';
import {
  ApiHeader,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

@ApiTags('Movie')
@Controller('movie')
export class MovieController {
  constructor(private readonly movieService: MovieService) {}

  @ApiOperation({
    summary: 'All movies list',
    description: 'getting all list of movies',
  })
  @ApiResponse({ status: HttpStatus.OK, description: 'Found movies' })
  @Get()
  findAll() {
    return [
      { id: 1, title: 'Fight Club' },
      { id: 2, title: 'Pulp Fiction' },
    ];
  }
  @ApiOperation({
    summary: 'Movie By ID',
    description: 'getting Movie Information by ID',
  })
  @ApiHeader({
    name: 'Accept-Language',
    description: 'Language',
    enum: ['ru', 'en', 'tk'],
  })
  @ApiOkResponse({ description: 'Found movie' })
  @ApiNotFoundResponse({ description: 'No Found movie' })
  @Get(':id')
  findById(@Param('id') id: string, @Query('year') year?: number) {
    return { id: 1, title: 'Fight Club' };
  }
}
