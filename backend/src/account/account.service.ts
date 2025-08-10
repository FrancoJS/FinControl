import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateAccountDto } from './dto/create-account.dto';
import { DataSource, EntityManager, Repository } from 'typeorm';
import { Account } from './entities/account.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { HandleDbErrors } from 'src/common/decorators/handle-db-errors.decorator';
import { Transaction } from 'src/transaction/entities/transaction.entity';
import { TransactionType } from 'src/common/enums/transaction-type.enum';
import { Category } from 'src/category/entities/category.entity';
// import { UpdateAccountDto } from './dto/update-account.dto';

@Injectable()
export class AccountService {
  constructor(
    @InjectRepository(Account)
    private readonly accountRepo: Repository<Account>,
    private readonly dataSource: DataSource,
  ) {}

  @HandleDbErrors()
  public async create(createAccountDto: CreateAccountDto) {
    const { balance: initialBalance = 0, userId, ...rest } = createAccountDto;

    const result = await this.dataSource.transaction(async (manager: EntityManager) => {
      const transactionRepo = manager.getRepository(Transaction);
      const accountRepo = manager.getRepository(Account);
      const categoryRepo = manager.getRepository(Category);

      const account = accountRepo.create({
        ...rest,
        user: { id: userId },
        balance: 0,
      });

      const newAccount = await accountRepo.save(account);

      const initalBalanceCategory = await categoryRepo.findOne({
        where: { type: TransactionType.INITIAL_BALANCE },
      });

      if (initialBalance > 0 && initalBalanceCategory) {
        const transaction = transactionRepo.create({
          amount: initialBalance,
          description: initalBalanceCategory.name,
          date: new Date(),
          type: TransactionType.INITIAL_BALANCE,
          user: { id: userId },
          toAccount: newAccount,
          category: { id: initalBalanceCategory.id },
        });

        await transactionRepo.save(transaction);
        await accountRepo.increment({ id: newAccount.id }, 'balance', initialBalance);
        newAccount.balance = initialBalance;

        return newAccount;
      }

      return newAccount;
    });
    return result;
  }

  // findAll() {
  //   return `This action returns all account`;
  // }

  @HandleDbErrors()
  public async findOneById(id: string) {
    const account = await this.accountRepo.findOneBy({ id });

    if (!account) {
      throw new NotFoundException(`La cuenta con id ${id} no existe`);
    }

    return account;
  }

  // update(id: number, updateAccountDto: UpdateAccountDto) {
  //   return `This action updates a #${id} account`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} account`;
  // }
}
