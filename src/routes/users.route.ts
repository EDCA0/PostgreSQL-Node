import express, { NextFunction, Request, Response, Router } from 'express';
import {
	CreateProductDto,
	CreateUserDto,
	UpdateProductDto,
	UpdateUserDto,
} from '../dtos';
import { validationHandler } from '../middlewares/validator.handler';
import { ApiResponse, User } from '../models';
import { UserService } from '../services/user.service';

export const usersRouter: Router = express.Router();
const service = new UserService();

usersRouter.post(
	'/',
	validationHandler(CreateUserDto),
	async (request: Request, response: Response, next: NextFunction) => {
		try {
			const body = await service.create(request.body);

			const responseApi: ApiResponse<User> = {
				success: true,
				statusCode: 201,
				data: body,
			};

			response.status(201).json(responseApi);
		} catch (error) {
			next(error);
		}
	},
);

usersRouter.get(
	'/',
	async (_request: Request, response: Response, next: NextFunction) => {
		try {
			const users = await service.find();

			const responseApi: ApiResponse<User[]> = {
				success: true,
				statusCode: 200,
				data: users,
			};

			response.status(200).json(responseApi);
		} catch (error) {
			next(error);
		}
	},
);

usersRouter.get(
	'/:id',
	async (request: Request, response: Response, next: NextFunction) => {
		try {
			const userId: string = request.params.id;
			const user: User = await service.findOne(userId);

			const responseApi: ApiResponse<User> = {
				success: true,
				statusCode: 200,
				data: user,
			};

			response.status(200).json(responseApi);
		} catch (error) {
			next(error);
		}
	},
);

usersRouter.patch(
	'/:id',
	validationHandler(UpdateUserDto),
	async (request: Request, response: Response, next: NextFunction) => {
		try {
			const id: string = request.params.id;
			const body = request.body;

			const updatedUser = await service.updatePatch(id, body);

			const responseApi: ApiResponse<User> = {
				success: true,
				statusCode: 200,
				data: updatedUser,
			};

			response.status(200).json(responseApi);
		} catch (error) {
			next(error);
		}
	},
);

usersRouter.put(
	'/:id',
	validationHandler(CreateUserDto),
	async (request: Request, response: Response, next: NextFunction) => {
		try {
			const id: string = request.params.id;
			const body = request.body;

			const update = await service.updatePut(id, body);
			const responseApi: ApiResponse<User> = {
				success: true,
				statusCode: 200,
				data: update,
			};

			response.status(200).json(responseApi);
		} catch (error) {
			next(error);
		}
	},
);

usersRouter.delete(
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
