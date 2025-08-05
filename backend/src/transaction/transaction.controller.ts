import { Controller, Get, Post, Body, Patch, Param, Delete, ParseUUIDPipe, BadRequestException } from '@nestjs/common';
import { TransactionService } from './transaction.service';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { UpdateTransactionDto } from './dto/update-transaction.dto';

@Controller('transaction')
export class TransactionController {
  constructor(private readonly transactionService: TransactionService) {}

  @Post()
  async create(@Body() createTransactionDto: CreateTransactionDto) {
    const transaction = await this.transactionService.create(createTransactionDto);

    return {
      ok: true,
      message: 'Transacción creada exitosamente',
      transaction,
    };
  }

  @Get(':userId')
  async findAllByUserId(
    @Param(
      'userId',
      new ParseUUIDPipe({ exceptionFactory: () => new BadRequestException('El ID del usuario debe ser un UUID válido') }),
    )
    userId: string,
  ) {
    const transactions = await this.transactionService.findAll(userId);

    return {
      ok: true,
      message: 'Transacciones obtenidas exitosamente',
      transactions,
    };
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.transactionService.findOne(+id);
  }

  @Patch(':transactionId')
  async update(
    @Param('transactionId', ParseUUIDPipe) transactionId: string,
    @Body() updateTransactionDto: UpdateTransactionDto,
  ) {
    const updatedTransaction = await this.transactionService.update(transactionId, updateTransactionDto);

    return {
      ok: true,
      message: 'Transacción actualizada exitosamente',
      transaction: updatedTransaction,
    };
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.transactionService.remove(+id);
  }
}
