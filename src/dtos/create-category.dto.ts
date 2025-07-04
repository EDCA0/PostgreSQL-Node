import { Transform } from 'class-transformer';
import { IsNotEmpty, IsUrl, Length, Matches } from 'class-validator';
import { trim, trimLower } from './common.dto';

export class CreateCategoryDto {
	@Transform(trim)
	@IsNotEmpty({
		message: 'La categoria no puede estar vacia',
	})
	@Matches(/^[a-zA-ZÁÉÍÓÚáéíóúÑñ\s'-]+$/, {
		message:
			'El nombre solo puede contener letras, espacios, apóstrofes y guiones',
	})
	@Length(2, 60, {
		message:
			'El nombre solo puede estar entre un rango de $constraint1 y $constraint2',
	})
	declare name: string;

	@Transform(trimLower)
	@IsNotEmpty({
		message: 'La imagen no puede estar vacia',
	})
	@IsUrl()
	declare image: string;
}
