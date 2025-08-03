import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { RecExpensesService } from './rec-transaction.service';
import { CreateRecExpenseDto } from './dto/create-rec-transaction.dto';
import { UpdateRecExpenseDto } from './dto/update-rec-transaction.dto';

@Controller('rec-expenses')
export class RecExpensesController {
  constructor(private readonly recExpensesService: RecExpensesService) {}

  @Post()
  create(@Body() createRecExpenseDto: CreateRecExpenseDto) {
    return this.recExpensesService.create(createRecExpenseDto);
  }

  @Get()
  findAll() {
    return this.recExpensesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.recExpensesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateRecExpenseDto: UpdateRecExpenseDto) {
    return this.recExpensesService.update(+id, updateRecExpenseDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.recExpensesService.remove(+id);
  }
}
