import { CreateCategoryDto } from '../dtos/create-category.dto';
import { CategoryPatch, CategoryPut, Category } from '../models';
import { faker } from '@faker-js/faker';
import { NotFoundError } from '../utils/httpErrors';

export class CategoryService {
	protected categories: Category[] = [];

	constructor() {}

	// POST (crear categoria)
	async create(body: CreateCategoryDto): Promise<Category> {
		const newBody: Category = {
			id: faker.string.uuid(),
			name: body.name,
			image: body.image,
		};

		this.categories.push(newBody);
		return newBody;
	}

	//  GET (Traer todos)
	async find(): Promise<Category[]> {
		return this.categories;
	}

	// GET (Traer uno por ID)
	async findOne(id: number | string): Promise<Category> {
		const category = this.categories.find((item) => item.id === id);
		if (!category) {
			throw new NotFoundError('Category not found');
		}
		return category;
	}

	// PATCH (Actualizacion parcial por ID)
	async updatePatch(id: string | number, body: CategoryPatch) {
		const index = this.categories.findIndex((item) => item.id === id);

		if (index === -1) {
			throw new NotFoundError('Category not found');
		}

		this.categories[index] = {
			...this.categories[index],
			...body,
		};

		return this.categories[index];
	}

	// PUT (Actualizacion total por ID)
	async updatePut(id: string | number, body: CategoryPut) {
		const index = this.categories.findIndex((item) => item.id === id);

		if (index === -1) {
			throw new NotFoundError('Category not found');
		}

		this.categories[index] = {
			id: this.categories[index].id,
			...body,
		};

		return this.categories[index];
	}

	// DELETE (Eliminacion por ID)
	async delete(id: string | number): Promise<void> {
		const index = this.categories.findIndex((item) => item.id === id);

		if (index === -1) {
			throw new NotFoundError('Category not found');
		}

		this.categories.splice(index, 1);
	}
}
