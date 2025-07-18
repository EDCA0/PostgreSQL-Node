import { Users } from '../entity';

export interface CustomerInput {
	readonly id: Number;
	customerName: string;
	customerLastName: string;
	userId: Users;
	customerPhone: string;
	createdAt: Date;
	updatedAt: Date;
}

export type CreateCustomerInput = Omit<CustomerInput, 'id' | 'updatedAt'>;
export type UpdateCustomerInput = Partial<CreateCustomerInput>;
