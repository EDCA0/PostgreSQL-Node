import express, { NextFunction, Request, Response, Router } from "express";
import { CreateOrderDto } from "../dtos/create-order.dto";
import { Orders } from "../entity";
import { validationHandler } from "../middlewares/validator.handler";
import { ApiResponse } from "../models";
import { OrderService } from "../services/order.service";

export const ordersRouter : Router = express.Router();
const service = new OrderService()

ordersRouter.post('/', validationHandler(CreateOrderDto), async (request: Request, response : Response, next: NextFunction) => {
    try {
        const body : CreateOrderDto = request.body;
        const newOrder = await service.create(body);

        const apiResponse: ApiResponse<Orders> = {
            success: true,
            statusCode: 201,
            data: newOrder
        }

        response.status(201).json(apiResponse);
    } catch (error) {
        next(error);
    }
})

ordersRouter.get('/', async (_request: Request, response : Response, next : NextFunction) => {
    try {
        const orders: Orders[] = await service.find()
        const apiResponse : ApiResponse<Orders[]> = {
            success: true,
            statusCode: 200,
            data: orders
        }

        response.status(200).json(apiResponse);
    } catch (error) {
        next(error)
    }
})

ordersRouter.get(
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

ordersRouter.delete(
	'/:id',
	async (request: Request, response: Response, next: NextFunction) => {
		try {
			const id: number = Number(request.params.id);
			await service.delete(id);

			response.sendStatus(204);
		} catch (error) {
			next(error);
		}
	},
);
