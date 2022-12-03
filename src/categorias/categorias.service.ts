import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCategoriaDto } from './dto/create-categoria.dto';
import { UpdateCategoriaDto } from './dto/update-categoria.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Categoria } from './entities/categoria.entity';
import { isUUID } from 'class-validator';

@Injectable()
export class CategoriasService {
  constructor(
    @InjectRepository(Categoria)
    private readonly categoriaRepository: Repository<Categoria>,
  ) {}

  async create(createCategoriaDto: CreateCategoriaDto) {
    const categoria = this.categoriaRepository.create({
      ...createCategoriaDto,
    });

    await this.categoriaRepository.save(categoria);
    return categoria;
  }

  async findAll() {
    const categoria = await this.categoriaRepository.find();
    return categoria;
  }

  async findOne(IdCategory: string) {
    if (!isUUID(IdCategory)) {
      throw new NotFoundException(`El id ${IdCategory} no es un uui valido`);
    }
    const categoria = await this.categoriaRepository.findOneBy({
      IdCategory,
    });
    if (!categoria) {
      throw new NotFoundException(
        `categoria con el id ${IdCategory} no existe`,
      );
    }

    return categoria;
  }

  async update(IdCategory: string, updateCategoriaDto: UpdateCategoriaDto) {
    if (!isUUID(IdCategory)) {
      throw new NotFoundException(`El id ${IdCategory} no es un uui valido`);
    }
    const categoria = await this.categoriaRepository.preload({
      IdCategory,
      ...updateCategoriaDto,
    });

    if (!categoria) {
      throw new NotFoundException(
        `categoria con el id ${IdCategory} no existe`,
      );
    }
    await this.categoriaRepository.save(categoria);

    return categoria;
  }

  async remove(IdCategory: string) {
    const categoria = await this.findOne(IdCategory);

    await this.categoriaRepository.remove(categoria);
    return `categoria ${categoria} eliminada`;
  }
}
