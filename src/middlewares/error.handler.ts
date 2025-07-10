import { NextFunction, Request, Response } from 'express';
import { HttpError } from '../utils/httpErrors';

export function logErrors(
	error: Error,
	_request: Request,
	_response: Response,
	next: NextFunction,
) {
	console.log('LogErrors');
	console.error(error);
	next(error);
}

export function errorHandler(
	error: any,
	_request: Request,
	response: Response,
	_next: NextFunction,
) {
	let statusCode: number;
	let message: string;

	if (error instanceof HttpError) {
		statusCode = error.statusCode;
		message = error.message;
	} else {
		statusCode = 500;
		message = 'Ha ocurrido un error inesperado';
	}

	const errorResponse: { message: string; stack?: string } = { message };

	if (process.env.NODE_ENV === 'development') {
		errorResponse.stack = error.stack;
	}

	response.status(statusCode).json(errorResponse);
}
