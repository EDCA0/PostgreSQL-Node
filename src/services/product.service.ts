import { CreateProductDto } from '../dtos';
import { Categories, Products } from '../entity';
import { Product, UpdateProductInput } from '../models/index';
import { NotFoundError } from '../utils/httpErrors';

export class ProductService {
	protected products: Product[] = [];
	constructor() {}

	async create(body: CreateProductDto): Promise<Product> {
		const categoryExists = await Categories.findOne({
			where: {
				id: body.category
			}
		})
		console.log(categoryExists)

		if(!categoryExists) {
			throw new NotFoundError('El id De la categoria no existe')
		}

		const newProduct = new Products();

		Object.assign(newProduct, body);

		await newProduct.save();
		return newProduct;
	}

	async find(): Promise<Product[]> {
		const products: Product[] = await Products.find();

		return products;
	}

	async findOne(id: number): Promise<Product> {
		const product = await Products.findOne({
			where: {
				id: id,
			},
			relations: {
				category: true,
			},
		});

		if (!product) {
			throw new NotFoundError('Product not found');
		}

		return product;
	}

	async update(id: number, changes: UpdateProductInput): Promise<Product> {
		await this.findOne(id);

		await Products.update(id, changes);

		return this.findOne(id);
	}

	async delete(id: number): Promise<void> {
		await this.findOne(id);
		await Products.delete(id);
	}
}
