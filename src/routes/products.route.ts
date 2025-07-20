import express, { NextFunction, Request, Response, Router } from 'express';

import { CreateProductDto, UpdateProductDto } from '../dtos';
import { validationHandler } from '../middlewares/validator.handler';
import { ApiResponse, Product } from '../models';
import { ProductService } from '../services/product.service';

export const productsRouter: Router = express.Router();
const service = new ProductService();

//  POST (crear uno)
productsRouter.post(
	'/',
	validationHandler(CreateProductDto),
	async (request: Request, response: Response, next: NextFunction) => {
		try {
			const body: CreateProductDto = request.body;
			const newProduct = await service.create(body);

			const apiResponse: ApiResponse<Product> = {
				success: true,
				statusCode: 201,
				data: newProduct,
			};

			response.status(201).json(apiResponse);
		} catch (error) {
			next(error);
		}
	},
);

//  GET (traer todos)
productsRouter.get(
	'/',
	async (_request: Request, response: Response, next: NextFunction) => {
		try {
			const products: Product[] = await service.find();
			const apiResponse: ApiResponse<Product[]> = {
				success: true,
				statusCode: 200,
				data: products,
			};

			response.status(200).json(apiResponse);
		} catch (error) {
			next(error);
		}
	},
);

//  GET (Traer uno mediante el ID)
productsRouter.get(
	'/:id',
	async (request: Request, response: Response, next: NextFunction) => {
		try {
			const id: number = Number(request.params.id);
			const product = await service.findOne(id);

			const apiResponse: ApiResponse<Product> = {
				success: true,
				statusCode: 200,
				data: product,
			};

			response.status(200).json(apiResponse);
		} catch (error) {
			next(error);
		}
	},
);

// PUT (Actualizacion total del contenido)
productsRouter.put(
	'/:id',
	validationHandler(UpdateProductDto),
	async (request: Request, response: Response, next: NextFunction) => {
		try {
			const id: number = Number(request.params.id);
			const body: UpdateProductDto = request.body;
			const updatedProduct = await service.update(id, body);

			const apiResponse: ApiResponse<Product> = {
				success: true,
				statusCode: 200,
				data: updatedProduct,
			};

			response.status(200).json(apiResponse);
		} catch (error) {
			next(error);
		}
	},
);

// DELETE (Borrar uno mediante ID)
productsRouter.delete(
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
