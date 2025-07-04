import { faker } from '@faker-js/faker';
import { IUser, CreateUserInput, UpdateUserInput } from '../models/user.model';
import { Gender } from '../models/user.model';
import { CreateUserDto } from '../dtos/create-user.dto';

const GENDERS: Gender[] = [Gender.MALE, Gender.FEMALE, Gender.OTHER];

export class userService {
	protected users: IUser[] = [];
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

	create(body: CreateUserDto) {
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

	find() {
		return this.users;
	}

	findOne(id: string) {
		return this.users.find((item) => item.id === id);
	}

	updatePath(id: string, changes: CreateUserInput) {
		const index = this.users.findIndex((item) => item.id === id);
		if (index === -1) {
			throw new Error('No se encontro el indice');
		}

		const user = this.users[index];
		this.users[index] = {
			...user,
			...changes,
		};

		return this.users[index];
	}

	updatePut(id: string, changes: UpdateUserInput) {
		const index = this.users.findIndex((item) => item.id === id);
		if (index === -1) {
			throw new Error('No se encontro el indice');
		}

		const user = this.users[index];
		this.users[index] = {
			...user,
			...changes,
		};

		return this.users[index];
	}

	delete(id: string) {
		const index = this.users.findIndex((item) => item.id === id);

		this.users.splice(index, 1);
		return id;
	}
}
