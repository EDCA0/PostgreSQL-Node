import { TransformFnParams } from 'class-transformer';

// Simplificacion para usar decorador @Transform
export const trim = ({ value }: TransformFnParams): string | unknown => {
	if (typeof value === 'string') {
		return value.trim(); //> Si se necesita que el texto este unicamente sin espacios (nombres etc..)
	}
	return value;
};

export const trimLower = ({ value }: TransformFnParams): string | unknown => {
	if (typeof value === 'string') {
		return value.trim().toLowerCase(); //> En caso de modularizacion tener todo sin espacios y en lowercase(correos etc...)
	}
	return value;
};
