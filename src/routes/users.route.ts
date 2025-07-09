import express, { NextFunction, Request, Response, Router } from 'express';
import { UserService } from '../services/user.service';
import { User, ApiResponse } from '../models';
import { CreateUserDto, UpdateUserDto } from '../dtos';
import { validationHandler } from '../middlewares/validator.handler';

export const usersRouter: Router = express.Router();
const service = new UserService();

usersRouter.post(
	'/',
	validationHandler(CreateUserDto),
	async (request: Request, response: Response, next: NextFunction) => {
		try {
			const body = request.body;
			const newBody = await service.create(body);
			const responseApi: ApiResponse<User> = {
				success: true,
				statusCode: 201,
				data: newBody,
			};

			response.status(201).json(responseApi);
		} catch (error) {
			next(error);
		}
	},
);

usersRouter.get(
	'/',
	async (request: Request, response: Response, next: NextFunction) => {
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
			const id: string = request.params.id;
			const user = await service.findOne(id);
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

			const userUpdated: User = await service.updatePatch(id, body);

			const responseApi: ApiResponse<User> = {
				success: true,
				statusCode: 200,
				data: userUpdated,
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

			const userUpdated: User = await service.updatePut(id, body);

			const responseApi: ApiResponse<User> = {
				success: true,
				statusCode: 200,
				data: userUpdated,
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
