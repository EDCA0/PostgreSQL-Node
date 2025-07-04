export interface Category {
	readonly id: number | string;
	name: string;
	image: string;
}

export type CategoryPatch = Partial<Omit<Category, 'id'>>;
export type CategoryPut = Omit<Category, 'id'>;
