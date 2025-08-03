import { Module } from '@nestjs/common';
import { SavingGoalService } from './saving_goal.service';
import { SavingGoalController } from './saving_goal.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SavingGoal } from './entities/saving_goal.entity';

@Module({
  imports: [TypeOrmModule.forFeature([SavingGoal])],
  controllers: [SavingGoalController],
  providers: [SavingGoalService],
})
export class SavingGoalModule {}
