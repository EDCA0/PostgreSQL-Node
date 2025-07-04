import { faker } from '@faker-js/faker';
import { Product, UpdateProductInput } from '../models/index';
import { CreateProductDto } from '../dtos';
import { NotFoundError } from '../utils/httpErrors';

export class ProductService {
	protected products: Product[] = [];
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

	async create(body: CreateProductDto): Promise<Product> {
		const newBody: Product = {
			id: faker.string.uuid(),
			name: body.name,
			price: body.price,
			image: body.image,
		};
		this.products.push(newBody);
		return newBody;
	}

	async find(): Promise<Product[]> {
		return this.products;
	}

	async findOne(id: string): Promise<Product> {
		const product = this.products.find((item) => item.id === id);

		if (!product) {
			throw new NotFoundError('Product not found');
		}
		return product;
	}

	async updatePatch(id: string, body: UpdateProductInput): Promise<Product> {
		const index = this.products.findIndex((item) => item.id === id);

		if (index === -1) {
			throw new NotFoundError('Product not found');
		}

		this.products[index] = {
			...this.products[index],
			...body,
		};

		return this.products[index];
	}

	async updatePut(id: string, body: CreateProductDto): Promise<Product> {
		const index = this.products.findIndex((item) => item.id === id);

		if (index === -1) {
			throw new NotFoundError('Product not found');
		}

		this.products[index] = {
			id: this.products[index].id,
			...body,
		};

		return this.products[index];
	}

	async delete(id: string): Promise<void> {
		const index = this.products.findIndex((item) => item.id === id);
		if (index === -1) {
			throw new NotFoundError('Product not found');
		}
		this.products.splice(index, 1);
	}
}
