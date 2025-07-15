import { faker } from '@faker-js/faker';
import { CreateUserDto } from '../dtos/create-user.dto';
import {
	CreateUserInput,
	Gender,
	UpdateUserInput,
	User,
} from '../models/user.model';
import { NotFoundError } from '../utils/httpErrors';

const GENDERS: Gender[] = [Gender.MALE, Gender.FEMALE, Gender.OTHER];

export class UserService {
	protected users: User[] = [];
	constructor() {
		this.generate();
	}

	generate() {
		const limit: number = 100;

		for (let index = 0; index < limit; index++) {
			this.users.push({
				id: faker.string.uuid(),
				name: faker.person.fullName(),
				email: faker.internet.email(),
				address: faker.location.street(),
				phone: faker.phone.number(),
				gender: faker.helpers.arrayElement(GENDERS),
			});
		}
	}

	async create(body: CreateUserDto): Promise<User> {
		const { name, email, address, phone, gender } = body;
		const newBody = {
			id: faker.string.uuid(),
			name,
			email,
			address,
			phone,
			gender,
		};

		this.users.push(newBody);
		return newBody;
	}

	async find(): Promise<User[]> {
		return this.users;
	}

	async findOne(id: string): Promise<User> {
		const user = this.users.find((user) => user.id === id);

		if (!user) {
			throw new NotFoundError('Usuario no encontrado');
		}

		return user;
	}

	async updatePatch(id: string, changes: UpdateUserInput): Promise<User> {
		const index = this.users.findIndex((item) => item.id === id);

		if (index === -1) {
			throw new Error('No se encontro el usuario');
		}

		const user = this.users[index];
		this.users[index] = {
			...user,
			...changes,
		};

		return this.users[index];
	}

	async updatePut(id: string, changes: CreateUserInput): Promise<User> {
		const index = this.users.findIndex((item) => item.id === id);

		if (index === -1) {
			throw new NotFoundError('No se encontro el usuario');
		}

		const user = this.users[index];
		this.users[index] = {
			...user,
			...changes,
		};

		return this.users[index];
	}

	async delete(id: string) {
		const index = this.users.findIndex((item) => item.id === id);
		if (index === -1) {
			throw new NotFoundError('No se encontro el usuario');
		}
		this.users.splice(index, 1);
	}
}
