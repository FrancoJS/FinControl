import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { QueryFailedError, Repository } from 'typeorm';
import { Transaction } from './entities/transaction.entity';
import { InjectRepository } from '@nestjs/typeorm';
// import { UpdateTransactionDto } from './dto/update-transaction.dto';

@Injectable()
export class TransactionService {
  constructor(
    @InjectRepository(Transaction)
    private readonly transactionRepo: Repository<Transaction>,
  ) {}
  public async create(createTransactionDto: CreateTransactionDto) {
    try {
      const transaction = this.transactionRepo.create(createTransactionDto);

      return await this.transactionRepo.save(transaction);
    } catch (error) {
      if (error instanceof QueryFailedError) {
        const driverError = error.driverError as { code?: string };

        if (driverError.code === '23503') {
          throw new ConflictException('Violacion de clave foranea de usuario', {
            description: 'Registro relacionado no existe',
          });
        }
      }
      console.log(error);
      throw new InternalServerErrorException(
        'Error al conectar con la base de datos',
      );
    }
  }

  // findAll() {
  //   return `This action returns all transaction`;
  // }

  // findOne(id: number) {
  //   return `This action returns a #${id} transaction`;
  // }

  // update(id: number, updateTransactionDto: UpdateTransactionDto) {
  //   return `This action updates a #${id} transaction`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} transaction`;
  // }
}
