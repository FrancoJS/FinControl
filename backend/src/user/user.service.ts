import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
// import { UpdateUserDto } from './dto/update-user.dto';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { HandleDbErrors } from 'src/common/decorators/handle-db-errors.decorator';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepo: Repository<User>,
  ) {}

  @HandleDbErrors()
  public async create(createUserDto: CreateUserDto) {
    const newUser = this.userRepo.create(createUserDto);
    return await this.userRepo.save(newUser);
  }

  public async findOneByEmail(email: string) {
    return await this.userRepo.findOne({
      where: { email },
    });
  }

  // findAll() {
  //   return `This action returns all user`;
  // }

  // update(id: number, updateUserDto: UpdateUserDto) {
  //   return `This action updates a #${id} user`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} user`;
  // }
}
