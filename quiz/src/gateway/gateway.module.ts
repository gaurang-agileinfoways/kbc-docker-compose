import { Module } from '@nestjs/common';
import { GatewayService } from './gateway.service';
import { QuizGateway } from './quiz.gateway';
import { ScheduleModule } from '@nestjs/schedule';
import { QuizModule } from 'src/quiz/quiz.module';

@Module({
  imports: [ScheduleModule.forRoot(), QuizModule],
  providers: [QuizGateway, GatewayService],
})
export class GatewayModule {}
