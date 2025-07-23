export class HttpError extends Error {
	statusCode: number;

	details: string | string[];

	constructor(message: string | string[], statusCode: number) {
		let errorMessage: string;

		if (Array.isArray(message)) {
			errorMessage = message.join(', ');
		} else {
			errorMessage = message;
		}

		super(errorMessage);
		this.statusCode = statusCode;
		this.name = this.constructor.name;
		this.details = message;
	}
}

export class NotFoundError extends HttpError {
	constructor(message: string = 'Recurso no encontrado') {
		super(message, 404);
	}
}

export class BadRequestError extends HttpError {
	constructor(message: string | string[] = 'Peticion incorrecta') {
		super(message, 400);
	}
}
export class ConflictError extends HttpError {
	constructor(message: string | string[] = 'Conflicto: El recurso ya existe.') {
		super(message, 409);
	}
}

export class UnauthorizedError extends HttpError {
	constructor(message: string | string[] = 'Usuario sin permisos') {
		super(message, 401);
	}
}
