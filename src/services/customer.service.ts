import { UpdateCustomerDto } from '../dtos';
import { CreateCustomerDto } from '../dtos/create-customer.dto';
import { Customers, Users } from '../entity';
import { CustomerInput } from '../models';
import { ConflictError, NotFoundError } from '../utils/httpErrors';

export class CustomerService {
	async create(body: CreateCustomerDto): Promise<CustomerInput> {
		const userId = await Users.findOne({
			where: {
				id: Number(body.userId),
			},
		});

		if (!userId) {
			throw new NotFoundError('Id del usuario no encontrado');
		}

		const existingCustomer = await Customers.findOne({
			where: {
				userId: body.userId,
			},
		});

		if (existingCustomer) {
			// Si ya existe un cliente para este userId, lanzamos un ConflictError
			throw new ConflictError(
				`Ya existe un cliente asociado al usuario con ID ${body.userId}.`,
			);
		}

		const newCustomer = new Customers();

		Object.assign(newCustomer, body);
		await newCustomer.save();
		return newCustomer;
	}

	async find(): Promise<CustomerInput[]> {
		const customers: CustomerInput[] = await Customers.find();
		return customers;
	}

	async findOne(id: number): Promise<CustomerInput> {
		const customer = await Customers.findOne({
			where: {
				id: id,
			},
		});

		if (!customer) {
			throw new NotFoundError('Customer no encontrado');
		}

		return customer;
	}

	async update(id: number, changes: UpdateCustomerDto): Promise<CustomerInput> {
		await Customers.update(id, {
			customerName: changes.customerName,
			customerLastName: changes.customerLastName,
			customerPhone: changes.customerPhone,
			updatedAt: new Date(),
		});

		return this.findOne(id);
	}

	async delete(id: number) {
		await this.findOne(id);
		await Customers.delete(id);
	}
}
