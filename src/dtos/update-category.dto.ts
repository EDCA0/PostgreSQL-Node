import { Transform } from 'class-transformer';
import { IsOptional, IsUrl, Length, Matches } from 'class-validator';
import { trim, trimLower } from './common.dto';

export class UpdateCategoryDto {
	@IsOptional()
	@Transform(trim)
	@Matches(/^[0-9A-Za-zÁÉÍÓÚáéíóúÑñ\s,.\-]+$/, {
		message: 'La dirección contiene caracteres inválidos',
	})
	@Length(2, 60, {
		message:
			'El nombre solo puede estar entre un rango de $constraint1 y $constraint2',
	})
	declare categoryName: string;

	@IsOptional()
	@Transform(trimLower)
	@IsUrl()
	declare categoryImage: string;
}
