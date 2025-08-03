import { Injectable } from '@nestjs/common';
import { CreateRecExpenseDto } from './dto/create-rec-transaction.dto';
import { UpdateRecExpenseDto } from './dto/update-rec-transaction.dto';

@Injectable()
export class RecExpensesService {
  create(createRecExpenseDto: CreateRecExpenseDto) {
    return 'This action adds a new recExpense';
  }

  findAll() {
    return `This action returns all recExpenses`;
  }

  findOne(id: number) {
    return `This action returns a #${id} recExpense`;
  }

  update(id: number, updateRecExpenseDto: UpdateRecExpenseDto) {
    return `This action updates a #${id} recExpense`;
  }

  remove(id: number) {
    return `This action removes a #${id} recExpense`;
  }
}
