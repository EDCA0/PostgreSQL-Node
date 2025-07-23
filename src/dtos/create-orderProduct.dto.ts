import { IsInt, IsNotEmpty, IsPositive, Min } from 'class-validator';

export class CreateOrderProductDto {
	@IsNotEmpty({
		message: 'El OrderId no puede estar vacio',
	})
	@IsInt({
		message: 'El OrderId debe de ser un entero',
	})
	@IsPositive({
		message: 'El OrderId debe ser un numero positivo',
	})
	declare order: number;

	@IsNotEmpty({
		message: 'El productId no puede estar vacio',
	})
	@IsInt({
		message: 'El productId debe de ser un entero',
	})
	@IsPositive({
		message: 'El productId debe ser un numero positivo',
	})
	declare product: number;

	@IsNotEmpty({
		message: 'El productId no puede estar vacio',
	})
	@IsInt({
		message: 'El productId debe de ser un entero',
	})
	@IsPositive({
		message: 'El productId debe ser un numero positivo',
	})
	@Min(1, {
		message: 'La cantidad no puede ser menor a $constraint1',
	})
	declare amount: number;
}
