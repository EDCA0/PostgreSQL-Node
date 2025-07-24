import 'dotenv/config';
import { NextFunction, Request, Response } from 'express';
import { UnauthorizedError } from '../utils/httpErrors';

export function checkApiKey(
	request: Request,
	_response: Response,
	next: NextFunction,
) {
	const apiKey = request.headers['api'];

	if (apiKey === process.env.APIKEY) {
		next();
	} else {
		throw new UnauthorizedError();
	}
}
