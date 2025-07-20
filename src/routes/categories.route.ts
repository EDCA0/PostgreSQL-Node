import express, { NextFunction, Request, Response, Router } from 'express';

import { CreateCategoryDto, UpdateCategoryDto } from '../dtos';
import { validationHandler } from '../middlewares/validator.handler';
import { ApiResponse, CategoryInput } from '../models';
import { CategoryService } from '../services/category.service';

export const categoriesRouter: Router = express.Router();
const service = new CategoryService();

// POST (crear uno)
categoriesRouter.post(
	'/',
	validationHandler(CreateCategoryDto),
	async (request: Request, response: Response, next: NextFunction) => {
		try {
			const body: CreateCategoryDto = request.body;
			const newCategory = await service.create(body);

			const apiResponse: ApiResponse<CategoryInput> = {
				statusCode: 201,
				success: true,
				data: newCategory,
			};

			response.status(201).json(apiResponse);
		} catch (error) {
			next(error);
		}
	},
);

// GET (traer todos)
categoriesRouter.get(
	'/',
	async (_request: Request, response: Response, next: NextFunction) => {
		try {
			const categories: CategoryInput[] = await service.find();

			const apiResponse: ApiResponse<CategoryInput[]> = {
				success: true,
				statusCode: 200,
				data: categories,
			};

			response.status(200).json(apiResponse);
		} catch (error) {
			next(error);
		}
	},
);

// GET (Traer uno)
categoriesRouter.get(
	'/:id',
	async (request: Request, response: Response, next: NextFunction) => {
		try {
			const id = Number(request.params.id);
			const category = await service.findOne(id);

			const apiResponse: ApiResponse<CategoryInput> = {
				statusCode: 200,
				success: true,
				data: category,
			};

			response.status(200).json(apiResponse);
		} catch (error) {
			next(error);
		}
	},
);

// PUT (actualizacion total por ID)
categoriesRouter.put(
	'/:id',
	validationHandler(UpdateCategoryDto),
	async (request: Request, response: Response, next: NextFunction) => {
		try {
			const id: number = Number(request.params.id);
			const body = request.body;
			const updatedCategory = await service.update(id, body);

			const apiResponse: ApiResponse<CategoryInput> = {
				success: true,
				statusCode: 200,
				data: updatedCategory,
			};

			response.status(200).json(apiResponse);
		} catch (error) {
			next(error);
		}
	},
);

categoriesRouter.delete(
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
