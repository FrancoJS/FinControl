import { Injectable } from '@nestjs/common';
import { CreateSavingGoalDto } from './dto/create-saving_goal.dto';
import { UpdateSavingGoalDto } from './dto/update-saving_goal.dto';
import { Repository } from 'typeorm';
import { SavingGoal } from './entities/saving-goal.entity';
import { InjectRepository } from '@nestjs/typeorm';

import { HandleDbErrors } from 'src/common/decorators/handle-db-errors.decorator';

@Injectable()
export class SavingGoalService {
  constructor(
    @InjectRepository(SavingGoal)
    private readonly savingGoalRepo: Repository<SavingGoal>,
  ) {}

  @HandleDbErrors()
  public async create(createSavingGoalDto: CreateSavingGoalDto) {
    const savingGoal = this.savingGoalRepo.create(createSavingGoalDto);

    const newSavingGoal = this.savingGoalRepo.save(savingGoal);

    return newSavingGoal;
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
