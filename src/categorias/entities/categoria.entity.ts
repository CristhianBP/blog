import {
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

  @CreateDateColumn({
    type: 'timestamp without time zone',
    name: 'C_creado',
    default: () => 'CURRENT_TIMESTAMP',
  })
  C_creado: Date;
}
