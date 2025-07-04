export enum Gender {
	MALE = 'male',
	FEMALE = 'female',
	OTHER = 'other',
}

export interface User {
	readonly id: string;
	name: string;
	email: string;
	address: string;
	phone: string;
	gender: Gender;
}

export type CreateUserInput = Omit<User, 'id'>;
export type UpdateUserInput = Partial<CreateUserInput>;
