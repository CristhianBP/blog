import { Module } from '@nestjs/common';
import { PublicacionesService } from './publicaciones.service';
import { PublicacionesController } from './publicaciones.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Publicaciones } from './entities/publicacione.entity';
import { CategoriasModule } from 'src/categorias/categorias.module';
import { CategoriasService } from 'src/categorias/categorias.service';

@Module({
  imports: [TypeOrmModule.forFeature([Publicaciones]), CategoriasModule],
  controllers: [PublicacionesController],
  providers: [PublicacionesService, CategoriasService],
  exports: [TypeOrmModule],
})
export class PublicacionesModule {}
