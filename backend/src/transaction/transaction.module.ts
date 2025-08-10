import { Module } from '@nestjs/common';
import { TransactionService } from './transaction.service';
import { TransactionController } from './transaction.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Transaction } from './entities/transaction.entity';
import { Category } from 'src/category/entities/category.entity';
import { TransactionValidatorService } from './services/transaction-validator.service';
import { SavingGoalModule } from 'src/saving-goal/saving-goal.module';
import { AccountModule } from 'src/account/account.module';
import { BalanceUpdaterService } from './services/balances-updater.service';
import { SavingGoal } from 'src/saving-goal/entities/saving-goal.entity';
import { Account } from 'src/account/entities/account.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Transaction, Category, Account, SavingGoal]), SavingGoalModule, AccountModule],
  controllers: [TransactionController],
  providers: [TransactionService, TransactionValidatorService, BalanceUpdaterService],
})
export class TransactionModule {}
