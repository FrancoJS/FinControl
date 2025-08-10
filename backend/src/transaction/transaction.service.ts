import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { DataSource, Repository } from 'typeorm';
import { Transaction } from './entities/transaction.entity';
import { InjectRepository } from '@nestjs/typeorm';
// import { UpdateTransactionDto } from './dto/update-transaction.dto';
import { HandleDbErrors } from 'src/common/decorators/handle-db-errors.decorator';
import { Category } from 'src/category/entities/category.entity';
import { TransactionValidatorService } from './services/transaction-validator.service';
import { AccountService } from 'src/account/account.service';
import { SavingGoalService } from 'src/saving-goal/saving-goal.service';
import { BalanceUpdaterService } from './services/balances-updater.service';

@Injectable()
export class TransactionService {
  constructor(
    @InjectRepository(Transaction)
    private readonly transactionRepo: Repository<Transaction>,
    @InjectRepository(Category)
    private readonly categoryRepo: Repository<Category>,
    private readonly transactionValidator: TransactionValidatorService,
    private readonly dataSource: DataSource,
    private readonly accountService: AccountService,
    private readonly savingGoalService: SavingGoalService,
    private readonly balancesUpdater: BalanceUpdaterService,
  ) {}

  @HandleDbErrors()
  public async create(createTransactionDto: CreateTransactionDto) {
    const category = await this.categoryRepo.findOne({
      where: { id: createTransactionDto.categoryId },
    });

    if (!category) {
      throw new NotFoundException('Categoria no encontrada');
    }

    const { toAccountId, fromAccountId, toSavingGoalId, fromSavingGoalId, amount, ...rest } = createTransactionDto;
    const type = category.type;

    this.transactionValidator.validate({ type, fromAccountId, toAccountId, fromSavingGoalId, toSavingGoalId });

    const toAccount = toAccountId ? await this.accountService.findOne(toAccountId) : null;
    const fromAccount = fromAccountId ? await this.accountService.findOne(fromAccountId) : null;
    const toSavingGoal = toSavingGoalId ? await this.savingGoalService.findOne(toSavingGoalId) : null;
    const fromSavingGoal = fromSavingGoalId ? await this.savingGoalService.findOne(fromSavingGoalId) : null;

    const transaction = await this.dataSource.transaction(async (manager) => {
      await this.balancesUpdater.updateBalances(manager, {
        type,
        toAccount,
        fromAccount,
        toSavingGoal,
        fromSavingGoal,
        amount,
      });

      const transactionRepo = manager.getRepository(Transaction);

      const transaction = this.transactionRepo.create({
        ...rest,
        toAccount: toAccountId ? { id: toAccountId } : undefined,
        fromAccount: fromAccountId ? { id: fromAccountId } : undefined,
        toSavingGoal: toSavingGoalId ? { id: toSavingGoalId } : undefined,
        fromSavingGoal: fromAccountId ? { id: fromSavingGoalId } : undefined,
        type,
        amount,
      });

      return await transactionRepo.save(transaction);
    });

    return transaction;
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
