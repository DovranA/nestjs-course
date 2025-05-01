import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateActorDto {
  @ApiProperty({ example: 'John' })
  @IsString()
  name: string;
}
