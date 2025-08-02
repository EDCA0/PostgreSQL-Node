import * as bcrypt from 'bcrypt';
import { Strategy } from 'passport-local';
import { UserService } from '../../../services/user.service';
import { NotFoundError, UnauthorizedError } from '../../httpErrors';
import { User, UserRequest } from '../../../models';
const service = new UserService();

export const localStrategy = new Strategy(
	{
		usernameField: 'email',
		passwordField: 'password',
	},
	async (email, password, done) => {
		try {
			const user = await service.findByEmail(email);

			if(!user) {
			    throw new UnauthorizedError('Correo o contraseña incorrectos');
			}

			if(!user.userPassword) {
				throw new NotFoundError('No se encuentra la contraseña del usuario')
			}

			const isMatch = await bcrypt.compare(password, user.userPassword);
			
			const verifyUser : UserRequest = {
				id: user.id,
				email: user.userEmail,
				role: user.userRole
			}

			if (!isMatch) {
				throw new UnauthorizedError('Contraseña o correo incorrecta');
			}

			done(null, verifyUser);
		} catch (error) {
			done(error, false);
		}
	},
);
