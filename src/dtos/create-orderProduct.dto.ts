import { IsInt, IsNotEmpty, IsPositive, Min } from 'class-validator';

export class CreateOrderProductDto {
    @IsNotEmpty({
        message: 'El customerId no puede estar vacio',
    })
    @IsInt({
        message: 'El customerId debe de ser un entero',
    })
    @IsPositive({
        message: 'El customerId debe ser un numero positivo',
    })
    declare customer: number;

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
        message: 'La cantidad no puede ser menor a $constraint1'
    })
    declare amount: number;
}
