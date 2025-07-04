import { CreateCategoryDto } from '../dtos/create-category.dto';
import { CategoryPatch, CategoryPut, ICategory } from '../models';
import { faker } from '@faker-js/faker';

export class CategoryService {
	protected categories: ICategory[] = [];

	constructor() {}

	// POST (crear categoria)
	async create(body: CreateCategoryDto): Promise<ICategory> {
		const newBody: ICategory = {
			id: faker.string.uuid(),
			name: body.name,
			image: body.image,
		};

		this.categories.push(newBody);
		return newBody;
	}

	//  GET (Traer todos)
	find() {
		return this.categories;
	}

	// GET (Traer uno por ID)
	async findOne(id: number | string): Promise<ICategory | undefined> {
		return this.categories.find((item) => item.id === id);
	}

	// PATCH (Actualizacion parcial por ID)
	async updatePatch(id: string | number, body: CategoryPatch) {
		const index = this.categories.findIndex((item) => item.id === id);

		if (index === -1) {
			throw new Error('Category not found');
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
			throw new Error('Category not found');
		}

		this.categories[index] = {
			id: this.categories[index].id,
			...body,
		};

		return this.categories[index];
	}

	// DELETE (Eliminacion por ID)
	delete(id: string | number) {
		const index = this.categories.findIndex((item) => item.id === id);

		if (index === -1) {
			throw new Error('Category not found');
		}

		this.categories.splice(index, 1);
	}
}
