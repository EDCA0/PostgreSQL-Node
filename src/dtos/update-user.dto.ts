	import { Transform } from 'class-transformer';
	import {
		IsEmail,
		IsEnum,
		IsNotEmpty,
		IsOptional,
		IsPhoneNumber,
		IsString,
		IsStrongPassword,
		Length,
		Matches,
	} from 'class-validator';
	import { Gender } from '../models/user.model';
	import { trim, trimLower } from './common.dto';

	export class UpdateUserDto {
		@IsOptional()
		@Transform(trim)
		@Matches(/^[a-zA-ZÁÉÍÓÚáéíóúÑñ\s'-]+$/, {
			message:
				'El nombre solo puede contener letras, espacios, apóstrofes y guiones',
		})
		@Length(2, 60, {
			message:
				'El nombre debe de estar entre $constraint1 y $constraint2 caracteres',
		})
		declare userName: string;

		@IsOptional()
		@Transform(trimLower)
		@IsEmail(
			{},
			{
				message: 'Debe ser un email válido',
			},
		)
		declare userEmail: string;

		@IsOptional()
		@IsString({
			message: 'La contraseña debe ser texto',
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
		declare userPassword: string;

		@IsOptional()
		@Transform(trim)
		@Matches(/^[0-9A-Za-zÁÉÍÓÚáéíóúÑñ\s,.\-]+$/, {
			message: 'La dirección contiene caracteres inválidos',
		})
		@Length(5, 100, {
			message:
				'La dirección debe tener entre $constraint1 y $constraint2 caracteres',
		})
		declare userAddress: string;

		@IsOptional()
		@Transform(trim)
		@IsPhoneNumber('CO', { message: 'Número de telefono inválido para Colombia' })
		declare phone: string;

		@IsOptional()
		@Transform(trimLower)
		@IsEnum(Gender, {
			message: 'El género debe ser uno de: ' + Object.values(Gender).join(', '),
		})
		declare userGender: Gender;
	}
