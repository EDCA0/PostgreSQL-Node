import { Transform } from 'class-transformer';
import { trim } from './common.dto';
import {
	IsInt,
	IsNotEmpty,
	IsOptional,
	IsPhoneNumber,
	IsPositive,
	Length,
} from 'class-validator';
import { Users } from '../entity';

export class UpdateCustomerDto {
	@IsOptional()
	@Transform(trim)
	@IsNotEmpty({
		message: 'El nombre no puede estar vacio',
	})
	@Length(3, 20, {
		message:
			'El nombre debe tener entre $constraint1 y $constraint2 caracteres',
	})
	declare customerName: string;

	@IsOptional()
	@Transform(trim)
	@IsNotEmpty({
		message: 'El nombre no puede estar vacio',
	})
	@Length(3, 30, {
		message:
			'El nombre debe tener entre $constraint1 y $constraint2 caracteres',
	})
	declare customerLastName: string;

	@IsOptional()
	@Transform(trim)
	@IsNotEmpty({
		message: 'El telefono no puede estar vacio',
	})
	@IsPhoneNumber('CO', {
		message:
			'El numero no cumple con las condiciones para que sea un numero colombiano',
	})
	declare customerPhone: string;
}
