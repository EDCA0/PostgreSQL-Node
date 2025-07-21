import { Customers } from '../entity';

export interface OrderInput {
	readonly id: number;
	customer: number;
}

export interface OrderOutput {
	readonly id: number;
	customer: Customers;
}
