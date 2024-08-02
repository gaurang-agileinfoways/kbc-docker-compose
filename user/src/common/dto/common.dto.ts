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
  @IsNotEmpty()
  @IsString()
  email: string;

  @IsNotEmpty()
  @IsString()
  @Matches(passwordRegex, { message: PASSWORD_NOT_MACHING })
  password: string;
}

export class ForgotPasswordDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;
}

export class DateRangeDto {
  @ValidateIf((r) => r.endDate)
  @IsNotEmpty()
  @IsDateString()
  startDate: string;

  @ValidateIf((r) => r.startDate)
  @IsNotEmpty()
  @IsDateString()
  endDate: string;
}

export class UserIdDto {
  @IsNotEmpty()
  @IsNumber()
  userId: number;
}

export class ResetPasswordDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  forgotPasswordToken: string;

  @IsNotEmpty()
  @IsString()
  @Matches(passwordRegex, { message: PASSWORD_NOT_MACHING })
  password: string;
}

export class ChangePasswordDto {
  @IsString()
  @IsNotEmpty()
  @Matches(passwordRegex, { message: PASSWORD_NOT_MACHING })
  oldPassword: string;

  @IsNotEmpty()
  @IsString()
  @Matches(passwordRegex, { message: PASSWORD_NOT_MACHING })
  newPassword: string;
}

export class IdDto {
  @IsNotEmpty()
  @IsString()
  _id: string;
}

export class TokenDto {
  @IsNotEmpty()
  @IsString()
  token: string;
}

export class EmailDto {
  @IsNotEmpty()
  @IsString()
  @IsEmail()
  email: string;
}

export class CommonListDto {
  @IsOptional()
  @IsNumber()
  page: number;

  @IsOptional()
  @IsNumber()
  limit: number;

  @IsOptional()
  search: string;

  @IsOptional()
  @IsString()
  sortOrder: string;

  @IsOptional()
  @IsString()
  sortBy: string;
}

export class UploadDto {
  file: any;
}
