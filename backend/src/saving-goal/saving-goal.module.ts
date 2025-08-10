import { Module } from '@nestjs/common';
import { SavingGoalService } from './saving-goal.service';
import { SavingGoalController } from './saving-goal.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SavingGoal } from './entities/saving-goal.entity';

@Module({
  imports: [TypeOrmModule.forFeature([SavingGoal])],
  controllers: [SavingGoalController],
  providers: [SavingGoalService],
  exports: [SavingGoalService],
})
export class SavingGoalModule {}
