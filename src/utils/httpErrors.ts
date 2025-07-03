export class HttpError extends Error {
	statusCode : number;

	constructor (
		message : string,
		statusCode : number
	) {
		super(message);
		this.statusCode = statusCode;
	}
}


export class NotFoundError extends HttpError {
	constructor (
		message : string = 'Recurso no encontrado'
	)
	{
		super(message, 404);
	}
}

export class BadRequestError extends HttpError {
	constructor (
		message: string = 'Peticion incorrecta'
	) {
		super (message, 400);
	}
}
