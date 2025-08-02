import { Transform } from 'class-transformer';
import {
	IsEmail,
	IsInt,
	IsNotEmpty,
	IsOptional,
	IsPositive,
	IsString,
	IsStrongPassword,
	Length,
	Matches,
} from 'class-validator';
import { trim, trimLower } from './common.dto';

export class AuthUserDto {
	@Transform(trimLower)
	@IsNotEmpty({ message: 'El email no puede estar vacio' })
	@IsEmail({}, { message: 'El email no es valido' })
	declare email: string;

	@Transform(trim)
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

	@IsOptional()
	@Transform(trim)
	@Matches(/^[0-9A-Za-zÁÉÍÓÚáéíóúÑñ\s,.\-]+$/, {
		message: 'El role contiene caracteres inválidos',
	})
	@Length(2, 60, {
		message:
			'El role solo puede estar entre un rango de $constraint1 y $constraint2',
	})
	declare role?: string;
}
