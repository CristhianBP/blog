import {
  BadGatewayException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CreateCategoriaDto } from './dto/create-categoria.dto';
import { UpdateCategoriaDto } from './dto/update-categoria.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Categoria } from './entities/categoria.entity';
import { isUUID } from 'class-validator';
import { PaginationDto } from 'src/common/dto/pagination';

@Injectable()
export class CategoriasService {
  constructor(
    @InjectRepository(Categoria)
    private readonly categoriaRepository: Repository<Categoria>,
  ) {}

  async create(createCategoriaDto: CreateCategoriaDto) {
    try {
      const categoria = this.categoriaRepository.create({
        ...createCategoriaDto,
      });

      await this.categoriaRepository.save(categoria);
      return categoria;
    } catch (error) {
      this.handleError(error);
    }
  }

  async findAll(paginationDto: PaginationDto) {
    const { limit = 0, offset = 0 } = paginationDto;

    const categoria = await this.categoriaRepository.find({
      take: limit,
      skip: offset,
    });

    return categoria;
  }

  async findOne(term: string) {
    let categoria: Categoria;
    try {
      if (isUUID(term)) {
        categoria = await this.categoriaRepository.findOneBy({
          IdCategory: term,
        });

        return categoria;
      } else {
        const queryBuilder = this.categoriaRepository.createQueryBuilder();

        categoria = await queryBuilder
          .where('slug =:slug', {
            slug: term,
          })
          .getOne();
        return categoria;
      }
    } catch (error) {
      this.handleError(error);
    }
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

  handleError(error: any) {
    if (error.code === '23505') throw new BadGatewayException(error.detail);

    console.log(error);

    throw new InternalServerErrorException('check log server');
  }
}
