import {
  IsString,
  MinLength,
  IsOptional,
  MaxLength,
  IsUUID,
} from 'class-validator';

export class CreatePublicacioneDto {
  @IsString()
  @MinLength(1)
  @MaxLength(255)
  Ptitulo: string;

  @IsString()
  @MinLength(1)
  Presumen: string;

  @IsString()
  @MinLength(1)
  Pdescription: string;

  @IsString()
  @MinLength(1)
  @MaxLength(20)
  Plugar: string;

  @IsString()
  @IsUUID()
  IdCategory: string;
}
