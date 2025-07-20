import { CreateUserDto } from '../dtos/create-user.dto';
import { Users } from '../entity/users';
import { CreateUserInput, User } from '../models/user.model';
import {
	ConflictError,
	NotFoundError
} from '../utils/httpErrors';

export class UserService {
	constructor() {}

	async create(body: CreateUserDto): Promise<User> {
		const exist = await Users.findOneBy({
			userEmail: body.userEmail,
		});

		if (exist) {
			throw new ConflictError(
				`correo existente en la base de datos: ${body.userEmail}`,
			);
		}

		const newUser = new Users();

		Object.assign(newUser, body);

		await newUser.save();
		return newUser;
	}

	async find(): Promise<User[]> {
		const users: User[] = await Users.find({
			relations: {
				customer: true,
			},
		});
		return users;
	}

	async findOne(id: number): Promise<User> {
		const user = await Users.findOne({
			where: {
				id: id,
			},
			relations: {
				customer: true,
			},
		});

		if (!user) {
			throw new NotFoundError('Usuario no encontrado');
		}

		return user;
	}

	async updatePut(id: number, changes: CreateUserInput): Promise<User> {
		await this.findOne(id);
		
		await Users.update(id, changes);

		return this.findOne(id);
	}

	async delete(id: number) {
		await this.findOne(id);
		await Users.delete(id);
	}
}
