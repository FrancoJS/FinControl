import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { SavingGoalService } from './saving_goal.service';
import { CreateSavingGoalDto } from './dto/create-saving_goal.dto';
import { UpdateSavingGoalDto } from './dto/update-saving_goal.dto';

@Controller('saving-goal')
export class SavingGoalController {
  constructor(private readonly savingGoalService: SavingGoalService) {}

  @Post()
  create(@Body() createSavingGoalDto: CreateSavingGoalDto) {
    return this.savingGoalService.create(createSavingGoalDto);
  }

  @Get()
  findAll() {
    return this.savingGoalService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.savingGoalService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateSavingGoalDto: UpdateSavingGoalDto) {
    return this.savingGoalService.update(+id, updateSavingGoalDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.savingGoalService.remove(+id);
  }
}
