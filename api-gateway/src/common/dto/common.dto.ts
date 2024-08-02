import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsNumber,
  ValidateIf,
  IsDateString,
  IsString,
  Matches,
  IsEmail,
  IsOptional,
} from 'class-validator';
import { passwordRegex } from '../constants/regex.constant';
import { PASSWORD_NOT_MACHING } from '../constants';

export class LoginDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  email: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @Matches(passwordRegex, { message: PASSWORD_NOT_MACHING })
  password: string;
}

export class ForgotPasswordDto {
  @IsEmail()
  @ApiProperty()
  @IsNotEmpty()
  email: string;
}

export class DateRangeDto {
  @ApiProperty({ type: Date, format: 'date' })
  @ValidateIf((r) => r.endDate)
  @IsNotEmpty()
  @IsDateString()
  startDate: string;

  @ApiProperty({ type: Date, format: 'date' })
  @ValidateIf((r) => r.startDate)
  @IsNotEmpty()
  @IsDateString()
  endDate: string;
}

export class UserIdDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  userId: number;
}

export class ResetPasswordDto {
  @IsEmail()
  @ApiProperty()
  @IsNotEmpty()
  email: string;

  @IsString()
  @ApiProperty()
  @IsNotEmpty()
  forgotPasswordToken: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @Matches(passwordRegex, { message: PASSWORD_NOT_MACHING })
  password: string;
}

export class ChangePasswordDto {
  @IsString()
  @ApiProperty()
  @IsNotEmpty()
  @Matches(passwordRegex, { message: PASSWORD_NOT_MACHING })
  oldPassword: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @Matches(passwordRegex, { message: PASSWORD_NOT_MACHING })
  newPassword: string;
}

export class IdDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  _id: string;
}

export class TokenDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  token: string;
}

export class EmailDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @IsEmail()
  email: string;
}

export class CommonListDto {
  @ApiProperty()
  @IsOptional()
  @IsNumber()
  page: number;

  @ApiProperty()
  @IsOptional()
  @IsNumber()
  limit: number;

  @ApiProperty()
  @IsOptional()
  search: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  sortOrder: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  sortBy: string;
}

export class UploadDto {
  @ApiProperty({ required: true, type: 'string', format: 'binary' })
  file: any;
}
