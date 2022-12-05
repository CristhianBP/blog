import { ApiProperty } from '@nestjs/swagger';
import { Publicaciones } from 'src/publicaciones/entities/publicacione.entity';
import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'category' })
export class Categoria {
  @ApiProperty({
    example: 'ebbcf0c8-f966-4b7b-bca1-3b017e980066',
    description: 'Categoria id',
    uniqueItems: true,
  })
  @PrimaryGeneratedColumn('uuid')
  IdCategory: string;

  @ApiProperty({
    example: 'deports',
    description: 'description category',
    uniqueItems: true,
    maxLength: 100,
  })
  @Column({
    type: 'varchar',
    length: 100,
    unique: true,
  })
  Cdescription: string;

  @ApiProperty({
    example: 'http://img.com',
    description: 'photo',
  })
  @Column({
    type: 'text',
    nullable: true,
  })
  Cphoto: string;

  @ApiProperty({
    example: '[deports,music]',
    description: 'tags categorias',
    isArray: true,
    default: [],
  })
  @Column({
    type: 'text',
    array: true,
    default: [],
  })
  tags: string[];

  @ApiProperty({
    example: 'true',
    description: 'estado categoria',
    nullable: true,
  })
  @Column({
    type: 'text',
    nullable: true,
  })
  estado: string;

  @ApiProperty({
    example: '/deports',
    description: 'url amigable',
    nullable: true,
  })
  @Column({
    unique: true,
    type: 'text',
    nullable: true,
  })
  slug: string;

  @ApiProperty({
    example: '2022-12-03 20:16:11.130795',
    description: 'fecha creacion categoria',
  })
  @CreateDateColumn({
    type: 'timestamp without time zone',
    name: 'C_creado',
    default: () => 'CURRENT_TIMESTAMP',
  })
  C_creado: Date;

  @OneToMany(() => Publicaciones, (publicaciones) => publicaciones.categoria, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  publicaciones: Publicaciones;

  @BeforeInsert()
  checkSlugInsert() {
    if (!this.slug) {
      this.slug = this.Cdescription;
    }
    this.slug = this.slug.replaceAll('_', '').replaceAll("'", '').toLowerCase();
  }

  @BeforeUpdate()
  checkslugUpdate() {
    this.checkSlugInsert();
  }
}
