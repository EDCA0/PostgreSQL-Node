import { faker } from '@faker-js/faker';
import { User, UpdateUserInput, Gender } from '../models/';
import { CreateUserDto } from '../dtos/create-user.dto';
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
		const newBody: User = {
			id: faker.string.uuid(),
			name: body.name,
			email: body.email,
			address: body.address,
			phone: body.phone,
			gender: body.gender,
		};

		this.users.push(newBody);
		return newBody;
	}

	async find(): Promise<User[]> {
		return this.users;
	}

	async findOne(id: string): Promise<User> {
		const user = this.users.find((item) => item.id === id);
		if (!user) {
			throw new NotFoundError('User not found');
		}
		return user;
	}

	async updatePatch(id: string, changes: UpdateUserInput): Promise<User> {
		const index: number = this.users.findIndex((item) => item.id === id);

		if (index === -1) {
			throw new NotFoundError('User not found');
		}

		const user: User = this.users[index];
		this.users[index] = {
			...user,
			...changes,
		};

		return this.users[index];
	}

	async updatePut(id: string, changes: CreateUserDto): Promise<User> {
		const index: number = this.users.findIndex((item) => item.id === id);
		if (index === -1) {
			throw new NotFoundError('User not found');
		}

		this.users[index] = {
			id: this.users[index].id,
			...changes,
		};

		return this.users[index];
	}

	async delete(id: string): Promise<void> {
		const index = this.users.findIndex((item) => item.id === id);

		if (index === -1) {
			throw new NotFoundError('User not found');
		}
		this.users.splice(index, 1);
	}
}
