import { Transform } from 'class-transformer';
import { IsOptional, IsPhoneNumber, Length } from 'class-validator';
import { trim } from './common.dto';

export class UpdateCustomerDto {
	@IsOptional()
	@Transform(trim)
	@Length(3, 20, {
		message:
			'El nombre debe tener entre $constraint1 y $constraint2 caracteres',
	})
	declare customerName: string;

	@IsOptional()
	@Transform(trim)
	@Length(3, 30, {
		message:
			'El nombre debe tener entre $constraint1 y $constraint2 caracteres',
	})
	declare customerLastName: string;

	@IsOptional()
	@Transform(trim)
	@IsPhoneNumber('CO', {
		message:
			'El numero no cumple con las condiciones para que sea un numero colombiano',
	})
	declare customerPhone: string;
}
