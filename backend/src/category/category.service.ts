import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Category } from './entities/category.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
  ) {}

  public async findAll() {
    try {
      const categories = this.categoryRepository.find();
      return categories;
    } catch {
      throw new InternalServerErrorException('Error en la base de datos', {
        description: 'Ocurrio un error al obtener las categorias',
      });
    }
  }
}
