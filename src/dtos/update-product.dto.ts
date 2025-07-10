import { Transform, Type } from 'class-transformer';
import {
	IsNotEmpty,
	IsNumber,
	IsOptional,
	IsPositive,
	IsUrl,
	Length,
	Matches,
	Min,
} from 'class-validator';
import { trim } from './common.dto';

export class UpdateProductDto {
	@IsOptional()
	@Transform(trim)
	@IsNotEmpty({
		message: 'El nombre no puede estar vacío',
	})
	@Matches(/^[a-zA-ZÁÉÍÓÚáéíóúÑñ\s'-]+$/, {
		message:
			'El nombre solo puede contener letras, espacios, apóstrofes y guiones',
	})
	@Length(2, 60, {
		message:
			'El nombre debe de estar entre $constraint1 y $constraint2 caracteres',
	})
	name!: string;

	@IsOptional()
	@Type(() => Number)
	@IsNumber(
		{},
		{
			message: 'El precio debe ser un número',
		},
	)
	@IsPositive({
		message: 'El precio debe ser positivo',
	})
	@Min(0.01, {
		message: 'El precio mínimo es $constraint1',
	})
	price!: number;

	@IsOptional()
	@Transform(trim)
	@IsNotEmpty({
		message: 'La URL de la imagen no puede estar vacía',
	})
	@IsUrl(
		{},
		{
			message: 'La URL de la imagen debe ser válida',
		},
	)
	image!: string;
}
