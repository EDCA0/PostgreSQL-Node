import { Transform } from 'class-transformer';
import { trim } from './common.dto';
import {
	IsInt,
	IsNotEmpty,
	IsPhoneNumber,
	IsPositive,
	Length,
} from 'class-validator';
import { Users } from '../entity';

export class CreateCustomerDto {
	@Transform(trim)
	@IsNotEmpty({
		message: 'El nombre no puede estar vacio',
	})
	@Length(3, 20, {
		message:
			'El nombre debe tener entre $constraint1 y $constraint2 caracteres',
	})
	declare customerName: string;

	@Transform(trim)
	@IsNotEmpty({
		message: 'El nombre no puede estar vacio',
	})
	@Length(3, 30, {
		message:
			'El nombre debe tener entre $constraint1 y $constraint2 caracteres',
	})
	declare customerLastName: string;

	@Transform(trim)
	@IsNotEmpty({
		message: 'El telefono no puede estar vacio',
	})
	@IsPhoneNumber('CO', {
		message:
			'El numero no cumple con las condiciones para que sea un numero colombiano',
	})
	declare customerPhone: string;

	@Transform(trim)
	@IsNotEmpty({
		message: 'El userId no puede estar vacio',
	})
	@IsInt({
		message: 'El userId debe de ser un entero',
	})
	@IsPositive({
		message: 'El userId debe ser un numero positivo',
	})
	declare user: Users;
}
