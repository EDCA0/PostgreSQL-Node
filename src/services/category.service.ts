import { CreateCategoryDto } from '../dtos/create-category.dto';
import { Categories } from '../entity';
import {
	CategoryInput,
	UpdateCategoryInput,
	CreateCategoryInput,
} from '../models';
import { NotFoundError } from '../utils/httpErrors';

export class CategoryService {
	protected categories: CategoryInput[] = [];

	constructor() {}

	// POST (crear categoria)
	async create(body: CreateCategoryDto): Promise<CategoryInput> {
		const newCategory = new Categories();

		Object.assign(newCategory, body);
		await newCategory.save();
		return newCategory;
	}

	//  GET (Traer todos)
	async find(): Promise<CategoryInput[]> {
		const categories: CategoryInput[] = await Categories.find({});

		return categories;
	}

	// GET (Traer uno por ID)
	async findOne(id: number): Promise<CategoryInput> {
		const category = await Categories.findOne({
			where: {
				id: id,
			},
			relations: {
				products: true,
			},
		});

		if (!category) {
			throw new NotFoundError('Category no encontrado');
		}

		return category;
	}

	async update(
		id: number,
		changes: CreateCategoryInput,
	): Promise<CategoryInput> {
		await this.findOne(id);
		await Categories.update(id, changes);
		return this.findOne(id);
	}

	// DELETE (Eliminacion por ID)
	async delete(id: number): Promise<void> {
		await this.findOne(id);
		await Categories.delete(id);
	}
}
