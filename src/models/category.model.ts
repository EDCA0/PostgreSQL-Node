export interface ICategory {
	readonly id: number | string;
	name: string;
	image: string;
}

export type CategoryPatch = Partial<Omit<ICategory, 'id'>>;
export type CategoryPut = Omit<ICategory, 'id'>;
