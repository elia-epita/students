import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateStudentDto {
  @ApiProperty({ description: 'this is a name' })
  @IsString()
  readonly name: string;

  @ApiProperty()
  @IsString()
  readonly promotion: string;

  @ApiProperty()
  @IsString({ each: true })
  readonly courses: string[];
}
