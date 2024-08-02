import { Module, OnModuleInit } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { LoggerModule } from 'src/common/logger/logger.module';
import { EmailService } from 'src/common/helpers/email';
import { CommonService } from 'src/common/services/common.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Users } from './entity/user.entity';
import { LoggerService } from 'src/common/logger/logger.service';

@Module({
  imports: [LoggerModule, TypeOrmModule.forFeature([Users])],
  controllers: [UsersController],
  providers: [UsersService, EmailService, CommonService],
  exports: [],
})
export class UsersModule implements OnModuleInit {
  constructor(private readonly userService: UsersService) {}

  async onModuleInit(): Promise<void> {
    new LoggerService().log(
      'MY SQL ALL ENV =>',
      process.env.MYSQL_HOST,
      process.env.MYSQL_PORT,
      process.env.MYSQL_USERNAME,
      process.env.MYSQL_PASSWORD,
      process.env.MYSQL_DATABASE,
    );

    await this.userService.createInitialUser();
  }
}
