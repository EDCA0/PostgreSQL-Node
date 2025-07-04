export interface Product {
	readonly id: string;
	name: string;
	price: number;
	image: string;
}

export type CreateProduct = Omit<Product, 'id'>;
export type UpdateProductInput = Partial<CreateProduct>;
