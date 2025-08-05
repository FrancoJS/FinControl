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

    const transactionType = category?.type;
    const transaction = this.transactionRepo.create({
      ...createTransactionDto,
      type: transactionType,
    });

    console.log(transaction);

    return await this.transactionRepo.save(transaction);
  }

  @HandleDbErrors()
  public async findAll(userId: string) {
    const transactions = await this.transactionRepo.find({
      where: { userId },
    });

    if (transactions.length <= 0) {
      throw new NotFoundException('El usuario no tiene transacciones creadas');
    }

    return transactions;
  }

  findOne(id: number) {
    return `This action returns a #${id} transaction`;
  }

  @HandleDbErrors()
  public async update(transactionId: string, updateTransactionDto: UpdateTransactionDto) {
    const result = await this.transactionRepo.update(transactionId, updateTransactionDto);

    if (result.affected === 0) {
      throw new NotFoundException('Transaccion no encontrada ');
    }
    return result;
  }

  remove(id: number) {
    return `This action removes a #${id} transaction`;
  }
}
