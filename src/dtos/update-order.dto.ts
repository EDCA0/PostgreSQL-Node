import {
    IsInt,
    IsOptional,
    IsPositive
} from 'class-validator';
import { Customers } from '../entity';

export class UpdateOrderDto {
    @IsOptional()
    @IsInt({
        message: 'El customerId debe de ser un entero',
    })
    @IsPositive({
        message: 'El customerId debe ser un numero positivo',
    })
    declare customer: Customers;
}
