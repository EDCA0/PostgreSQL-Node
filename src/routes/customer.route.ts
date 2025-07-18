import express, { NextFunction, Request, Response, Router } from 'express';
import { CreateCustomerDto, UpdateCustomerDto } from '../dtos';
import { validationHandler } from '../middlewares/validator.handler';
import {
	ApiResponse,
	CreateCustomerInput,
	CustomerInput,
	UpdateCustomerInput,
} from '../models';
import { CustomerService } from '../services/customer.service';

export const customerRouter: Router = express.Router();
const service = new CustomerService();

customerRouter.post(
	'/',
	validationHandler(CreateCustomerDto),
	async (request: Request, response: Response, next: NextFunction) => {
		try {
			const body: CustomerInput = request.body;
			const newCustomer: CreateCustomerDto = await service.create(body);

			const responseApi: ApiResponse<CreateCustomerDto> = {
				success: true,
				statusCode: 201,
				data: newCustomer,
			};

			response.status(201).json(responseApi);
		} catch (error) {
			next(error);
		}
	},
);

customerRouter.get(
	'/',
	async (_request: Request, response: Response, next: NextFunction) => {
		try {
			const customer: CustomerInput[] = await service.find();

			const responseApi: ApiResponse<CustomerInput[]> = {
				success: true,
				statusCode: 200,
				data: customer,
			};

			response.status(200).json(responseApi);
		} catch (error) {
			next(error);
		}
	},
);

customerRouter.get(
	'/:id',
	async (request: Request, response: Response, next: NextFunction) => {
		try {
			const customerId: number = Number(request.params.id);

			const customer: CustomerInput = await service.findOne(customerId);

			const responseApi: ApiResponse<CustomerInput> = {
				success: true,
				statusCode: 200,
				data: customer,
			};

			response.status(200).json(responseApi);
		} catch (error) {
			next(error);
		}
	},
);

customerRouter.put(
	'/:id',
	validationHandler(UpdateCustomerDto),
	async (request: Request, response: Response, next: NextFunction) => {
		try {
			const id: number = Number(request.params.id);
			const body: CreateCustomerInput = request.body;

			const update = await service.update(id, body);
			const responseApi: ApiResponse<CustomerInput> = {
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

customerRouter.delete(
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
