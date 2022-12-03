import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePublicacioneDto } from './dto/create-publicacione.dto';
import { UpdatePublicacioneDto } from './dto/update-publicacione.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Publicaciones } from './entities/publicacione.entity';
import { CategoriasService } from 'src/categorias/categorias.service';
import { isUUID } from 'class-validator';

@Injectable()
export class PublicacionesService {
  constructor(
    @InjectRepository(Publicaciones)
    private readonly publicacionesRepository: Repository<Publicaciones>,
    private readonly categoriasService: CategoriasService,
  ) {}
  async create(createPublicacioneDto: CreatePublicacioneDto) {
    const categoria = await this.categoriasService.findOne(
      createPublicacioneDto.IdCategory,
    );

    const publicaciones = this.publicacionesRepository.create({
      ...createPublicacioneDto,
      categoria,
    });

    await this.publicacionesRepository.save(publicaciones);
    return publicaciones;
  }

  async findAll() {
    const publicaciones = await this.publicacionesRepository.find();
    return publicaciones;
  }

  async findOne(IdPost: string) {
    if (!isUUID(IdPost)) {
      throw new NotFoundException(`El id ${IdPost} no es un uui valido`);
    }

    const publicaciones = await this.publicacionesRepository.findOneBy({
      IdPost: IdPost,
    });

    if (!publicaciones) {
      throw new NotFoundException(
        `publicaciones con el id ${publicaciones} no existe`,
      );
    }
    return publicaciones;
  }

  async update(IdPost: string, updatePublicacioneDto: UpdatePublicacioneDto) {
    if (!isUUID(IdPost)) {
      throw new NotFoundException(`El id ${IdPost} no es un uui valido`);
    }

    const publicaciones = await this.publicacionesRepository.preload({
      IdPost,
      ...updatePublicacioneDto,
    });

    if (!publicaciones) {
      throw new NotFoundException(
        `publicaciones con el id ${publicaciones} no existe`,
      );
    }

    await this.publicacionesRepository.save(publicaciones);
    return publicaciones;
  }

  async remove(IdPost: string) {
    const publicaciones = await this.findOne(IdPost);
    await this.publicacionesRepository.remove(publicaciones);
    return 'la publicacion se elimino correctamente';
  }
}
