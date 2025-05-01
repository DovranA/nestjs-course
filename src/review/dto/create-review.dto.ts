import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString, IsUUID, Max, Min } from 'class-validator';

export class CreateReviewDto {
  @ApiProperty()
  @IsString()
  text: string;

  @ApiProperty()
  @IsNumber()
  @Min(0)
  @Max(10)
  rating: number;

  @ApiProperty()
  @IsUUID('4')
  movieId: string;
}
