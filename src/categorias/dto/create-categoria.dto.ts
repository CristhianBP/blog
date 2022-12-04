import {
  IsString,
  MinLength,
  IsOptional,
  IsArray,
  IsIn,
} from 'class-validator';
export class CreateCategoriaDto {
  @IsString()
  @MinLength(1)
  Cdescription: string;

  @IsString()
  @IsOptional()
  Cphoto: string;

  @IsString({ each: true })
  @IsArray()
  @IsOptional()
  tags: string[];

  @IsIn(['active', 'inactive'])
  estado: string;

  @IsOptional()
  @IsString()
  slug: string;
}
