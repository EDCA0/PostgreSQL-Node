import express, { NextFunction, Request, Response, Router } from 'express';

import { CreateOrderProductDto } from '../dtos/create-orderProduct.dto';
import { OrderProduct } from '../entity/order-product';
import { validationHandler } from '../middlewares/validator.handler';
import { ApiResponse } from '../models';
import { OrderProductService } from '../services/orderProduct.service';

export const orderProductRouter: Router = express.Router();
const service = new OrderProductService();

//  POST (crear uno)
orderProductRouter.post(
    '/',
    validationHandler(CreateOrderProductDto),
    async (request: Request, response: Response, next: NextFunction) => {
        try {
            const body: CreateOrderProductDto = request.body;
            const newOrderProduct = await service.create(body);

            const apiResponse: ApiResponse<OrderProduct> = {
                success: true,
                statusCode: 201,
                data: newOrderProduct,
            };

            response.status(201).json(apiResponse);
        } catch (error) {
            next(error);
        }
    },
);

//  GET (traer todos)
orderProductRouter.get(
    '/',
    async (request: Request, response: Response, next: NextFunction) => {
 try {
            let skip: number | undefined;
            let take: number | undefined;
            let sortByColumn: string | undefined;
            let sortDirection: string | undefined;

            // Procesar 'skip'
            if (request.query.skip) {
                const parsedSkip = Number(request.query.skip);
                if (!isNaN(parsedSkip)) { // Asegurarse de que es un número válido
                    skip = parsedSkip;
                }
            }

            // Procesar 'take'
            if (request.query.take) {
                const parsedTake = Number(request.query.take);
                if (!isNaN(parsedTake)) { // Asegurarse de que es un número válido
                    take = parsedTake;
                }
            }

            // Procesar 'sortByColumn'
            if (request.query.sortByColumn) {
                sortByColumn = request.query.sortByColumn as string;
            }

            // Procesar 'sortDirection'
            if (request.query.sortDirection) {
                sortDirection = request.query.sortDirection as string;
            }

            // Llama a tu función de servicio con los parámetros obtenidos
            const ordersProducts: OrderProduct[] = await service.find(
                skip,
                take,
                sortByColumn,
                sortDirection
            );

            const apiResponse: ApiResponse<OrderProduct[]> = {
                success: true,
                statusCode: 200,
                data: ordersProducts,
            };

            response.status(200).json(apiResponse);
        } catch (error) {
            next(error);
        }
    },
);

//  GET (Traer uno mediante el ID)
orderProductRouter.get(
    '/:id',
    async (request: Request, response: Response, next: NextFunction) => {
        try {
            const id: number = Number(request.params.id);
            const orderProduct = await service.findOne(id);

            const apiResponse: ApiResponse<OrderProduct> = {
                success: true,
                statusCode: 200,
                data: orderProduct,
            };

            response.status(200).json(apiResponse);
        } catch (error) {
            next(error);
        }
    },
);

// DELETE (Borrar uno mediante ID)
orderProductRouter.delete(
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
