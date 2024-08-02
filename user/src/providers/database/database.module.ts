import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Users } from 'src/users/entity/user.entity';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        type: 'mysql',
        host: configService.get<string>('database.mysql.host'),
        port: configService.get<number>('database.mysql.port'),
        username: configService.get<string>('database.mysql.username'),
        password: configService.get<string>('database.mysql.password'),
        database: configService.get<string>('database.mysql.database'),
        entities: [Users],
        synchronize: true,
      }),
    }),
  ],
})
export class DatabaseModule {}
