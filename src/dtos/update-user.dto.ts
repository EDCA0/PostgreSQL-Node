import { Transform } from 'class-transformer';
import {
	IsEmail,
	IsEnum,
	IsNotEmpty,
	IsOptional,
	IsPhoneNumber,
	Length,
	Matches,
} from 'class-validator';
import { Gender } from '../models/user.model';
import { trim, trimLower } from './common.dto';

export class UpdateUserDto {
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
	@Transform(trimLower)
	@IsNotEmpty({
		message: 'El email no puede estar vacío',
	})
	@IsEmail(
		{},
		{
			message: 'Debe ser un email válido',
		},
	)
	email!: string;

	@IsOptional()
	@Transform(trim)
	@IsNotEmpty({
		message: 'La dirección no puede estar vacía',
	})
	@Matches(/^[0-9A-Za-zÁÉÍÓÚáéíóúÑñ\s,.\-]+$/, {
		message: 'La dirección contiene caracteres inválidos',
	})
	@Length(5, 100, {
		message:
			'La dirección debe tener entre $constraint1 y $constraint2 caracteres',
	})
	address!: string;

	@IsOptional()
	@Transform(trim)
	@IsNotEmpty({
		message: 'El teléfono no puede estar vacío',
	})
	@IsPhoneNumber('CO', { message: 'Número de telefono inválido para Colombia' })
	phone!: string;

	@IsOptional()
	@Transform(trimLower)
	@IsNotEmpty({
		message: 'El género no puede estar vacío',
	})
	@IsEnum(Gender, {
		message: 'El género debe ser uno de: ' + Object.values(Gender).join(', '),
	})
	gender!: Gender;
}
