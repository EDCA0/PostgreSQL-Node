export interface IProduct {
	readonly id : string;
	name  : string;
	price : number;
	image : string;
}

export type CreateProduct = Omit<IProduct,'id'>;
export type UpdateProductInput = Partial<IProduct>;
