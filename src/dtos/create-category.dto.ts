import { Transform } from 'class-transformer';
import { IsNotEmpty, IsUrl, Length, Matches } from 'class-validator';
import { trim, trimLower } from './common.dto';

export class CreateCategoryDto {
	@Transform(trim)
	@IsNotEmpty({
		message: 'La categoria no puede estar vacia',
	})
	@Matches(/^[0-9A-Za-zÁÉÍÓÚáéíóúÑñ\s,.\-]+$/, {
		message: 'La categoria contiene caracteres inválidos',
	})
	@Length(2, 60, {
		message:
			'la categoria solo puede estar entre un rango de $constraint1 y $constraint2',
	})
	declare categoryName: string;

	@Transform(trimLower)
	@IsNotEmpty({
		message: 'La imagen no puede estar vacia',
	})
	@IsUrl()
	declare categoryImage: string;
}
