import { Injectable } from '@nestjs/common';
import { CreateSavingGoalDto } from './dto/create-saving_goal.dto';
import { UpdateSavingGoalDto } from './dto/update-saving_goal.dto';

@Injectable()
export class SavingGoalService {
  create(createSavingGoalDto: CreateSavingGoalDto) {
    return 'This action adds a new savingGoal';
  }

  findAll() {
    return `This action returns all savingGoal`;
  }

  findOne(id: number) {
    return `This action returns a #${id} savingGoal`;
  }

  update(id: number, updateSavingGoalDto: UpdateSavingGoalDto) {
    return `This action updates a #${id} savingGoal`;
  }

  remove(id: number) {
    return `This action removes a #${id} savingGoal`;
  }
}
