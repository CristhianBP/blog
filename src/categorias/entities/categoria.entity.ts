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
  @PrimaryGeneratedColumn('uuid')
  IdCategory: string;

  @Column({
    type: 'varchar',
    length: 100,
    unique: true,
  })
  Cdescription: string;

  @Column({
    type: 'text',
    nullable: true,
  })
  Cphoto: string;

  @Column({
    type: 'text',
    array: true,
    default: [],
  })
  tags: string[];

  @Column({
    type: 'text',
    nullable: true,
  })
  estado: string;

  @Column({
    unique: true,
    type: 'text',
    nullable: true,
  })
  slug: string;

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
