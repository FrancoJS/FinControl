import { Injectable, NotFoundException } from '@nestjs/common';
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
    const savingGoal = this.savingGoalRepo.create({ ...createSavingGoalDto, savedAmount: 0 });

    const newSavingGoal = this.savingGoalRepo.save(savingGoal);

    return newSavingGoal;
  }

  // findAll() {
  //   return `This action returns all savingGoal`;
  // }

  public async findOne(id: string) {
    const savingGoal = await this.savingGoalRepo.findOneBy({ id });

    if (!savingGoal) {
      throw new NotFoundException(`La meta de ahorro con id ${id} no existe`);
    }

    return savingGoal;
  }

  // update(id: number, updateSavingGoalDto: UpdateSavingGoalDto) {
  //   return `This action updates a #${id} savingGoal`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} savingGoal`;
  // }
}
