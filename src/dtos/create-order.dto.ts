import {
    IsInt,
    IsNotEmpty,
    IsPositive
} from 'class-validator';

export class CreateOrderDto {
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
}
