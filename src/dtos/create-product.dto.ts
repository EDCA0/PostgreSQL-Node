import {
	IsBoolean,
	isNotEmpty,
	IsNotEmpty,
	IsNumber,
	IsPositive,
	IsUrl,
	Length,
	Matches,
	Min
} from 'class-validator'
import { Transform, Type } from 'class-transformer';
import { trim, trimLower} from './common.dto';


export class CreateProductDto{
	@Transform(trim)
	@IsNotEmpty({
		message : 'El nombre no puede estar vacío',
	})
	@Matches(/^[a-zA-ZÁÉÍÓÚáéíóúÑñ\s'-]+$/, {
		message : 'El nombre solo puede contener letras, espacios, apóstrofes y guiones',
	})
	@Length(2, 60, {
		message : 'El nombre debe de estar entre $constraint1 y $constraint2 caracteres',
	})
	name! : string;

	@Type(() => Number)
	@IsNumber({}, {
		message : 'El precio debe ser un número'
	})
	@IsPositive({
		message : 'El precio debe ser positivo'
	})
	@Min(0.01, {
			message : 'El precio mínimo es $constraint1'
		})
	price! : number;

	@Transform(trim)
	@IsNotEmpty({
		message : 'La URL de la imagen no puede estar vacía'
	})
	@IsUrl({}, {
		message : 'La URL de la imagen debe ser válida'
	})
	image! : string;
}
