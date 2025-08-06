import { Injectable } from '@nestjs/common';
import { CreateAccountDto } from './dto/create-account.dto';
import { Repository } from 'typeorm';
import { Account } from './entities/account.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { HandleDbErrors } from 'src/common/decorators/handle-db-errors.decorator';
import { Transaction } from 'src/transaction/entities/transaction.entity';
import { TransactionType } from 'src/common/enums/transaction-type.enum';
// import { UpdateAccountDto } from './dto/update-account.dto';

@Injectable()
export class AccountService {
  constructor(
    @InjectRepository(Account)
    private readonly accountRepository: Repository<Account>,
    @InjectRepository(Transaction)
    private readonly transactionRepository: Repository<Transaction>,
  ) {}

  @HandleDbErrors()
  public async create(createAccountDto: CreateAccountDto) {
    const { balance: initialBalance = 0, userId, ...rest } = createAccountDto;

    const account = this.accountRepository.create({
      ...rest,
      user: { id: userId },
      balance: 0,
    });

    const newAccount = await this.accountRepository.save(account);

    if (initialBalance > 0) {
      const transaction = this.transactionRepository.create({
        amount: initialBalance,
        description: 'Saldo inicial',
        date: new Date(),
        type: TransactionType.INITIAL_BALANCE,
        user: { id: userId },
        account: newAccount,
        category: { id: 1 },
      });

      await this.transactionRepository.save(transaction);
      await this.accountRepository.increment({ id: newAccount.id }, 'balance', initialBalance);
      newAccount.balance = initialBalance;
    }

    return newAccount;
  }

  // findAll() {
  //   return `This action returns all account`;
  // }

  // findOne(id: number) {
  //   return `This action returns a #${id} account`;
  // }

  // update(id: number, updateAccountDto: UpdateAccountDto) {
  //   return `This action updates a #${id} account`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} account`;
  // }
}
