export interface IApiResponse <T> {
	success : boolean;
	statusCode : number;
	data : T | null
	error?: string; //> Se usa si succes es false para explicar el porque dio false
}
