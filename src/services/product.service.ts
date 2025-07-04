import { faker } from '@faker-js/faker';
import { IProduct, UpdateProductInput } from '../models/index';
import { CreateProductDto } from '../dtos';

export class ProductService {
	protected products: IProduct[] = [];
	constructor() {
		this.generate();
	}

	async generate() {
		const limit: number = 100;

		for (let index = 0; index < limit; index++) {
			this.products.push({
				id: faker.string.uuid(),
				name: faker.commerce.productName(),
				price: parseInt(faker.commerce.price(), 10),
				image: faker.image.url(),
			});
		}
	}

	async create(body: CreateProductDto): Promise<IProduct> {
		const newBody: IProduct = {
			id: faker.string.uuid(),
			name: body.name,
			price: body.price,
			image: body.image,
		};
		this.products.push(newBody);
		return newBody;
	}

	async find() {
		return this.products;
	}

	async findOne(id: string): Promise<IProduct | undefined> {
		return this.products.find((item) => item.id === id);
	}

	async updatePatch(
		id: string,
		body: UpdateProductInput,
	): Promise<IProduct | undefined> {
		const index = this.products.findIndex((item) => item.id === id);

		if (index === -1) {
			throw new Error('Product not found');
		}

		this.products[index] = {
			...this.products[index],
			...body,
		};

		return this.products[index];
	}

	async updatePut(
		id: string,
		body: UpdateProductInput,
	): Promise<IProduct | undefined> {
		const index = this.products.findIndex((item) => item.id === id);

		if (index === -1) {
			throw new Error('Product not found');
		}

		this.products[index] = {
			...this.products[index],
			...body,
		};

		return this.products[index];
	}

	async delete(id: string) {
		const index = this.products.findIndex((item) => item.id === id);
		if (index === -1) {
			throw new Error('Product not found');
		}
		this.products.splice(index, 1);
	}
}
