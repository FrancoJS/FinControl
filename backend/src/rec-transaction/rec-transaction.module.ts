import { Module } from '@nestjs/common';
import { RecExpensesService } from './rec-transaction.service';
import { RecExpensesController } from './rec-transaction.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RecTransaction } from './entities/rec-transaction.entity';

@Module({
  imports: [TypeOrmModule.forFeature([RecTransaction])],
  controllers: [RecExpensesController],
  providers: [RecExpensesService],
})
export class RecTransactionModule {}
