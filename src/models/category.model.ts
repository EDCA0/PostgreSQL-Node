export interface Category {
	readonly id: number | string;
	name: string;
	image: string;
}

export type CategoryPut = Omit<Category, 'id'>;
export type CategoryPatch = Partial<CategoryPut>;
