import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { Repository } from 'typeorm';
import { Transaction } from './entities/transaction.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { UpdateTransactionDto } from './dto/update-transaction.dto';
import { HandleDbErrors } from 'src/common/decorators/handle-db-errors.decorator';
import { Category } from 'src/category/entities/category.entity';

@Injectable()
export class TransactionService {
  constructor(
    @InjectRepository(Transaction)
    private readonly transactionRepo: Repository<Transaction>,
    @InjectRepository(Category)
    private readonly categoryRepo: Repository<Category>,
  ) {}

  @HandleDbErrors()
  public async create(createTransactionDto: CreateTransactionDto) {
    const category = await this.categoryRepo.findOne({
      where: { id: createTransactionDto.categoryId },
    });

    if (!category) {
      throw new NotFoundException('Categoria no encontrada');
    }

    const { toAccountId, fromAccountId, toSavingGoalId, fromSavingGoalId, ...rest } = createTransactionDto;

    const transactionType = category?.type;
    const transaction = this.transactionRepo.create({
      ...rest,
      toAccount: toAccountId ? { id: toAccountId } : undefined,
      fromAccount: fromAccountId ? { id: fromAccountId } : undefined,
      toSavingGoal: toSavingGoalId ? { id: toSavingGoalId } : undefined,
      fromSavingGoal: fromAccountId ? { id: fromSavingGoalId } : undefined,
      type: transactionType,
    });

    return await this.transactionRepo.save(transaction);
  }

  @HandleDbErrors()
  public async findAll(userId: string) {
    const transactions = await this.transactionRepo.find({
      where: { userId },
    });

    if (transactions.length <= 0) {
      throw new NotFoundException('Transacciones no encontradas');
    }

    return transactions;
  }

  findOne(id: number) {
    return `This action returns a #${id} transaction`;
  }

  // @HandleDbErrors()
  // public async update(transactionId: string, updateTransactionDto: UpdateTransactionDto) {
  //   const transaction = await this.transactionRepo.preload({ id: transactionId, ...updateTransactionDto });

  //   if (!transaction) {
  //     throw new NotFoundException('Transaccion no encontrada');
  //   }

  //   return await this.transactionRepo.save(transaction);
  // }

  @HandleDbErrors()
  public async softDelete(transactionId: string) {
    const result = await this.transactionRepo.softDelete(transactionId);

    if (result.affected === 0) {
      throw new NotFoundException('Transaccion no encontrada');
    }

    return true;
  }
}
