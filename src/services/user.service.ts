import * as bcrypt from 'bcrypt';
import { CreateUserDto } from '../dtos/create-user.dto';
import { Users } from '../entity/users';
import { CreateUserInput, User } from '../models/user.model';
import { ConflictError, NotFoundError } from '../utils/httpErrors';


export class UserService {
	constructor() {}

	async create(body: CreateUserDto): Promise<User> {
		body.userPassword = await bcrypt.hash(body.userPassword, 10);

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
		const showData : User = newUser
		delete showData.userPassword

		return showData;
	}

	async find(): Promise<User[]> {
		const users: User[] = await Users.find();
		return users;
	}

	async findByEmail(email: string): Promise<Users> {
		const users = await Users.findOneBy(
			{userEmail: email}	
		);

		if (!users) {
			throw new NotFoundError(`No existe el email: ${email}`)
		}

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
