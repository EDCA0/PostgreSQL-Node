import express, { NextFunction, Request, Response, Router } from 'express';

import { CreateProductDto, UpdateProductDto } from '../dtos';
import { IApiResponse, IProduct } from '../models';
import { NotFoundError } from '../utils/httpErrors';
import { ProductService } from '../services/product.service';
import { validationHandler } from '../middlewares/validator.handler';

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

			const apiResponse: IApiResponse<IProduct> = {
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
	async (request: Request, response: Response, next: NextFunction) => {
		try {
			const products = await service.find();
			const apiResponse: IApiResponse<IProduct[]> = {
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
			const id: string = request.params.id;
			const product = await service.findOne(id);

			if (!product) {
				throw new NotFoundError('El producto no fue encontrado');
			}

			const apiResponse: IApiResponse<IProduct> = {
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

// PATCH (Actualizacion parcial del contenido)
productsRouter.patch(
	'/:id',
	validationHandler(UpdateProductDto),
	async (request: Request, response: Response, next: NextFunction) => {
		try {
			const id: string = request.params.id;
			const body: UpdateProductDto = request.body;
			const updatedProduct = await service.updatePatch(id, body);

			if (!updatedProduct) {
				throw new NotFoundError('Producto no encontrado para actualizar');
			}

			const apiResponse: IApiResponse<IProduct> = {
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

// PUT (Actualizacion total del contenido)
productsRouter.put(
	'/:id',
	validationHandler(CreateProductDto),
	async (request: Request, response: Response, next: NextFunction) => {
		try {
			const id: string = request.params.id;
			const body: CreateProductDto = request.body;
			const updatedProduct = await service.updatePut(id, body);

			if (!updatedProduct) {
				throw new NotFoundError('Producto no encontrado para actualizar');
			}

			const apiResponse: IApiResponse<IProduct> = {
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
			const id: string = await request.params.id;
			service.delete(id);

			response.sendStatus(204);
		} catch (error) {
			next(error);
		}
	},
);
