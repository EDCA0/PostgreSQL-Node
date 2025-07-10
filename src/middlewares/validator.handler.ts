import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';
import { NextFunction, Request, Response } from 'express';
import { BadRequestError } from '../utils/httpErrors';

export function validationHandler(dtoClass: any) {
	return async (request: Request, _response: Response, next: NextFunction) => {
		try {
			const dtoInstance = plainToInstance(dtoClass, request.body);
			const errors = await validate(dtoInstance, {
				whitelist: true,
			});

			console.log('resultado de la validacion:', errors);

			if (errors.length > 0) {
				const messages: string[] = errors.flatMap((error) =>
					Object.values(error.constraints ?? {}),
				);
				throw new BadRequestError(messages);
			}
			request.body = dtoInstance;
			next();
		} catch (error) {
			next(error);
		}
	};
}
