import { CreateUserDto } from '../dtos/create-user.dto';
import { Users } from '../entity/user';
import { CreateUserInput, UpdateUserInput, User } from '../models/user.model';
import { BadRequestError, ConflictError, NotFoundError } from '../utils/httpErrors';

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
		const users: User[] = await Users.find();
		return users;
	}

	async findOne(id: number): Promise<User> {
		const user = await Users.findOne({
			where: {
				id: id,
			},
		});

		if (!user) {
			throw new NotFoundError('Usuario no encontrado');
		}

		return user;
	}

	async updatePatch(id: string, changes: UpdateUserInput): Promise<User> {
		const userId = Number(id);

		if (isNaN(userId)) {
			throw new BadRequestError('ID de usuario inválido.');
		}

		await Users.update(id, {
			userName: changes.userName,
			userEmail: changes.userEmail,
			userPassword: changes.userPassword,
			userAddress: changes.userAddress,
			phone: changes.phone,
			userGender: changes.userGender,
		});

		return this.findOne(userId);
	}

	async updatePut(id: number, changes: CreateUserInput): Promise<User> {
		await Users.update(id, changes);

		return this.findOne(id);
	}

	async delete(id: number) {
		await this.findOne(id);
		await Users.delete(id);
	}
}
