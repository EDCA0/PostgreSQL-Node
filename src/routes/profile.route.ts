import express, { NextFunction, Request, Response, Router } from 'express';
import { Orders } from '../entity';
import { ApiResponse } from '../models';
import { OrderService } from '../services/order.service';
import passport, { use } from 'passport';
import { UnauthorizedError } from '../utils/httpErrors';

export const profileRouter: Router = express.Router();
const service = new OrderService();

profileRouter.get(
	'/orders',
	passport.authenticate('jwt', { session: false }),
	async (request: Request, response: Response, next: NextFunction) => {
		try {
			const user = request.user;
			console.log(user);
			if (!user) {
				throw new UnauthorizedError('No tiene permisos');
			}

			console.log(user);
			const order = await service.findByIdUser(user.id);

			const apiResponse: ApiResponse<Orders[]> = {
				success: true,
				statusCode: 200,
				data: order,
			};

			response.status(200).json(apiResponse);
		} catch (error) {
			next(error);
		}
	},
);

profileRouter.get(
	'/:id',
	async (request: Request, response: Response, next: NextFunction) => {
		try {
			const id: number = Number(request.params.id);
			const order = await service.findOne(id);

			const apiResponse: ApiResponse<Orders> = {
				success: true,
				statusCode: 200,
				data: order,
			};

			response.status(200).json(apiResponse);
		} catch (error) {
			next(error);
		}
	},
);
