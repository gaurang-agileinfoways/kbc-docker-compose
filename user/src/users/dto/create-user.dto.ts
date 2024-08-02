import { IsNotEmpty, IsString, IsEmail, Matches } from 'class-validator';
import { PASSWORD_NOT_MACHING } from 'src/common/constants';
import { passwordRegex } from 'src/common/constants/regex.constant';
export class CreateUserDto {
  @IsNotEmpty()
  @IsString()
  firstName: string;

  @IsNotEmpty()
  @IsString()
  lastName: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  @Matches(passwordRegex, { message: PASSWORD_NOT_MACHING })
  password: string;
}
