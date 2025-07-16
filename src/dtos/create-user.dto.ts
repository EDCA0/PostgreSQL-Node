import { Transform } from 'class-transformer';
import {
	IsEmail,
	IsEnum,
	IsNotEmpty,
	IsPhoneNumber,
	IsString,
	IsStrongPassword,
	Length,
	Matches,
} from 'class-validator';
import { Gender } from '../models/user.model';
import { trim, trimLower } from './common.dto';

export class CreateUserDto {
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
	declare name: string;

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
	declare email: string;

	@IsString({
		message: 'La contraseña debe ser texto',
	})
	@IsNotEmpty({
		message: 'La contraseña no puede estar vacia',
	})
	@IsStrongPassword(
		{},
		{
			message:
				'La contraseña no cumple con los requisitos mínimos de seguridad (mínimo 8 caracteres, al menos una mayúscula, una minúscula, un número y un símbolo).',
		},
	)
	@Length(8, 100, {
		message: 'La contraseña debe estar entre $constraint1 y $constraint2',
	})
	declare password: string;

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
	declare address: string;

	@Transform(trim)
	@IsNotEmpty({
		message: 'El teléfono no puede estar vacío',
	})
	@IsPhoneNumber('CO', { message: 'Número de telefono inválido para Colombia' })
	declare phone: string;

	@Transform(trimLower)
	@IsNotEmpty({
		message: 'El género no puede estar vacío',
	})
	@IsEnum(Gender, {
		message: 'El género debe ser uno de: ' + Object.values(Gender).join(', '),
	})
	declare gender: Gender;
}
