import 'dotenv/config';
import { NextFunction, Request, Response } from 'express';
import { BadRequestError, UnauthorizedError } from '../utils/httpErrors';
import { Roles } from '../models';

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


export function checkAdminRole (request: Request, response :Response, next: NextFunction) {
	const user = request.user;

	if(user?.role === 'admin') {
		next();
	} else {
		throw new UnauthorizedError();
	}
}

export function checkRoles (...roles : Roles[]) {
	return (request: Request, response :Response, next: NextFunction) => {
		const user = request.user;

		if(!user) {
			throw new BadRequestError()
		}

		if(roles.includes(user?.role)) {
			next()
		} else {
			throw new UnauthorizedError()
		}
	}
}