import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';
import { NextFunction, Request, Response } from 'express';
import { BadRequestError } from '../utils/httpErrors';

export function validationHandler<T extends object>(dtoClass: { new (): T }) {
	return async (request: Request, response: Response, next: NextFunction) => {
		try {
			const dtoInstance = plainToInstance(dtoClass, request.body);
			const errors = await validate(dtoInstance);

			if (errors.length > 0) {
				const messages = errors.flatMap((error) =>
					Object.values(error.constraints ?? {}),
				);
				throw new BadRequestError(messages.join(', '));
			}
			next();
		} catch (error) {
			next(error);
		}
	};
}
