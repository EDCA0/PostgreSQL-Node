export enum Gender {
	MALE = 'male',
	FEMALE = 'female',
	OTHER = 'other',
}

export enum Roles {
	ADMIN = 'admin',
	SELLER = 'seller',
	CUSTOMER = 'customer'
}

export interface User {
	readonly id: number;
	userName: string;
	userEmail: string;
	userPassword?: string;
	userAddress: string;
	phone: string;
	userGender: Gender;
	userRole: Roles;
	createdAt: Date;
}

export type CreateUserInput = Omit<User, 'id'>;
export type UpdateUserInput = Partial<CreateUserInput>;
