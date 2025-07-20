import { UpdateCustomerDto } from '../dtos';
import { CreateCustomerDto } from '../dtos/create-customer.dto';
import { Customers, Users } from '../entity';
import { CustomerInput } from '../models';
import { ConflictError, NotFoundError } from '../utils/httpErrors';

export class CustomerService {
	async create(body: CreateCustomerDto): Promise<CustomerInput> {
		const user = await Users.findOne({
			where: {
				id: Number(body.user),
			},
		});

		if (!user) {
			throw new NotFoundError('Id del usuario no encontrado');
		}

		const existingCustomer = await Customers.findOneBy({
			user: {
				id: Number(body.user),
			},
		});

		if (existingCustomer) {
			// Si ya existe un cliente para este user, lanzamos un ConflictError
			throw new ConflictError(
				`Ya existe un cliente asociado al usuario con ID ${body.user}.`,
			);
		}

		const newCustomer = new Customers();

		Object.assign(newCustomer, body);
		await newCustomer.save();
		return newCustomer;
	}

	async find(): Promise<CustomerInput[]> {
		const customers: CustomerInput[] = await Customers.find({
			relations: {
				user: true,
			},
		});
		return customers;
	}

	async findOne(id: number): Promise<CustomerInput> {
		const customer = await Customers.findOne({
			where: {
				id: id,
			},
			relations: {
				user: true,
			},
		});

		if (!customer) {
			throw new NotFoundError('Customer no encontrado');
		}

		return customer;
	}

	async update(id: number, changes: UpdateCustomerDto): Promise<CustomerInput> {
		await this.findOne(id)
		await Customers.update(id, changes);

		return this.findOne(id);
	}

	async delete(id: number) {
		await this.findOne(id);
		await Customers.delete(id);
	}
}
