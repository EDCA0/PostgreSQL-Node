export interface ApiResponse<T> {
	success: boolean;
	statusCode: number;
	data: T | null;
	error?: string | string[]; //> Se usa si succes es false para explicar el porque dio false
}
