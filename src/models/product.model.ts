export interface Product {
	readonly id: number;
	productName: string;
	productPrice: number;
	productDescription: string;
	productImage: string;
}

export type CreateProduct = Omit<Product, 'id'>;
export type UpdateProductInput = Partial<CreateProduct>;
