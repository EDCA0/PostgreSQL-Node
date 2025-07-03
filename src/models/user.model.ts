export enum Gender {
	MALE = 'male',
	FEMALE = 'female',
	OTHER = 'other',
}

export interface IUser {
	readonly id : string;
	name : string;
	email : string;
	address : string;
	phone : string;
	gender : Gender
}


export type CreateUserInput = Omit<IUser, 'id'>;
export type UpdateUserInput = Partial<Omit<IUser, "id">>;
