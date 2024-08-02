import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsNotEmpty, IsString } from 'class-validator';
import { IsAnswerInOptions } from 'src/common/decorators/IsAnswerInOptions.validation';
import { IsArrayLength } from 'src/common/decorators/IsArrayLength.validation';

export class AddQustionDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  question: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsArray()
  @IsArrayLength(4, { message: 'array must have 4 elements.' })
  options: [string];

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @IsAnswerInOptions({ message: 'Answer must be one of the options' })
  answer: string;
}
