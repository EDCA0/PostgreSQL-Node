export interface CategoryInput {
	readonly id: number | string;
	categoryName: string;
	categoryImage: string;
	createdAt: Date;
	updatedAt: Date;
}

export type CreateCategoryInput = Omit<CategoryInput, 'id'>;
export type UpdateCategoryInput = Partial<CreateCategoryInput>;
