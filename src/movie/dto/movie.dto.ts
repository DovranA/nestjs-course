import { ApiProperty } from '@nestjs/swagger';
import {
  IsArray,
  IsInt,
  IsNotEmpty,
  IsString,
  IsUUID,
  Max,
  Min,
} from 'class-validator';

export class MovieDto {
  @ApiProperty({ example: 'Title' })
  @IsNotEmpty()
  @IsString()
  title: string;

  @ApiProperty({ example: 2020 })
  @IsNotEmpty()
  @IsInt()
  @Min(1988)
  @Max(new Date().getFullYear())
  releaseYear: number;

  @IsString()
  imageUrl: string;

  @ApiProperty({ example: [] })
  @IsArray()
  @IsUUID('4', { each: true })
  actorIds: string[];
}
