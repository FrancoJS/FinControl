import { Injectable } from '@nestjs/common';
import { CreateAccountDto } from './dto/create-account.dto';
import { Repository } from 'typeorm';
import { Account } from './entities/account.entity';
import { InjectRepository } from '@nestjs/typeorm';
// import { UpdateAccountDto } from './dto/update-account.dto';

@Injectable()
export class AccountService {
  constructor(
    @InjectRepository(Account)
    private readonly accountRepository: Repository<Account>,
  ) {}
  public async create(createAccountDto: CreateAccountDto) {
    return 'This method uses the repository';
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
