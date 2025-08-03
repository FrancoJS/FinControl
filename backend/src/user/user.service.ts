import { ConflictException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
// import { UpdateUserDto } from './dto/update-user.dto';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepo: Repository<User>,
  ) {}
  public async create(createUserDto: CreateUserDto) {
    try {
      const user = await this.findOneByEmail(createUserDto.email);

      if (user) throw new ConflictException('El usuario con el email dado ya se encuentra registrado');

      const newUser = this.userRepo.create(createUserDto);

      return await this.userRepo.save(newUser);
    } catch (error) {
      if (error instanceof ConflictException) {
        throw error;
      }

      throw new InternalServerErrorException('Error Interno', {
        description: 'Error en conectar a la base de datos',
      });
    }
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
