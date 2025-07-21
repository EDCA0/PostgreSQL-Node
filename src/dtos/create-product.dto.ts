import { Transform, Type } from 'class-transformer';
import {
	IsInt,
	IsNotEmpty,
	IsNumber,
	IsPositive,
	IsString,
	IsUrl,
	Length,
	Matches,
	Min,
} from 'class-validator';
import { trim } from './common.dto';

export class CreateProductDto {
	@Transform(trim)
	@IsNotEmpty({
		message: 'El nombre no puede estar vacío',
	})
	@Matches(/^[0-9A-Za-zÁÉÍÓÚáéíóúÑñ\s,.\-]+$/, {
		message: 'La dirección contiene caracteres inválidos',
	})
	@Length(2, 60, {
		message:
			'El nombre debe de estar entre $constraint1 y $constraint2 caracteres',
	})
	declare productName: string;

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
	declare productPrice: number;

	@Transform(trim)
	@IsNotEmpty({
		message: 'La descripcion no puede estar vacio',
	})
	@IsString({
		message: 'La descripcion debe ser un texto',
	})
	@Length(5, 150, {
		message: 'La descripcion debe estar entre $constraint1 y $constraint2',
	})
	declare productDescription: string;

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
	declare productImage: string;

	@IsNotEmpty({
		message: 'El categoryId no puede estar vacia',
	})
	@IsInt({
		message: 'El categoryId debe ser un entero',
	})
	@IsPositive({
		message: 'EL categoryId debe ser un numero positivo',
	})
	@Min(1, {
		message: 'El categoryId debe ser minimo $constraint1',
	})
	declare category: number;
}
