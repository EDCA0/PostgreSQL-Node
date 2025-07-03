import { plainToInstance } from "class-transformer";
import { validate } from "class-validator";
import { NextFunction, Request, Response } from "express";
import { BadRequestError } from "../utils/httpErrors";

export function validationHandler (dtoClass: any) {
	return async (request : Request, response : Response, next : NextFunction) => {
		try {
			const dtoInstance = plainToInstance(dtoClass, request.body);
			const errors = await validate(dtoInstance);

			if(errors.length > 0) {
				throw new BadRequestError(JSON.stringify(errors));
			}
			next()
		} catch (error) {
			next(error)
		}
	}
}
