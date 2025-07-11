import express, { Router, Request, Response, NextFunction } from 'express';

import { validationHandler } from '../middlewares/validator.handler';
import { CategoryService } from '../services/category.service';
import { CreateCategoryDto, UpdateCategoryDto } from '../dtos';
import { ApiResponse, Category } from '../models';
import { NotFoundError } from '../utils/httpErrors';

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

			const apiResponse: ApiResponse<Category> = {
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
			const categories: Category[] = await service.find();

			const apiResponse: ApiResponse<Category[]> = {
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
			const id = request.params.id;
			const category = await service.findOne(id);

			const apiResponse: ApiResponse<Category> = {
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

// PATCH (actualizacion parcial por ID)
categoriesRouter.patch(
	'/:id',
	validationHandler(UpdateCategoryDto),
	async (request: Request, response: Response, next: NextFunction) => {
		try {
			const id: string = request.params.id;
			const body: UpdateCategoryDto = request.body;
			const updatedCategory = await service.updatePatch(id, body);

			const apiResponse: ApiResponse<Category> = {
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

// PUT (actualizacion total por ID)
categoriesRouter.put(
	'/:id',
	validationHandler(CreateCategoryDto),
	async (request: Request, response: Response, next: NextFunction) => {
		try {
			const id: string = request.params.id;
			const body: CreateCategoryDto = request.body;
			const updatedCategory = await service.updatePut(id, body);

			const apiResponse: ApiResponse<Category> = {
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
			const id: string = request.params.id;
			await service.delete(id);

			response.sendStatus(204);
		} catch (error) {
			next(error);
		}
	},
);
