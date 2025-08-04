import * as bcrypt from 'bcrypt';
import { Strategy, ExtractJwt, StrategyOptionsWithRequest } from 'passport-jwt';
import { UserRequest } from '../../../models';
import { UserService } from '../../../services/user.service';
import { NotFoundError, UnauthorizedError } from '../../httpErrors';
import 'dotenv/config';
import { jwtVerify } from 'jose';

const jwtSecret = process.env.JWT_SECRET;
if (!jwtSecret) {
	// En un entorno de producción, es crucial fallar si el secreto no está configurado
	console.error('ERROR: La variable de entorno JWT_SECRET no está definida.');
	// Una alternativa es lanzar un error para detener la aplicación
	process.exit(1);
}

const secretBytes = new TextEncoder().encode(jwtSecret);

const jwtOptions = {
	jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
	passReqToCallback: true,
	secretOrKey: jwtSecret,
};

export const joseStrategy = new Strategy(
	jwtOptions as StrategyOptionsWithRequest,
	async (req, payload, done) => {
		try {
			console.log('Estrategia JWT iniciada');
			const token = ExtractJwt.fromAuthHeaderAsBearerToken()(req);
			console.log('Token extraído:', token ? 'sí' : 'no');

			if (!token) {
				console.warn(
					'No se encontró el token en el encabezado de autorización.',
				);
				return done(null, false);
			}

			const { payload: josePayload } = await jwtVerify(token, secretBytes);
			console.log('Payload verificado:', josePayload);

			if (!josePayload || !josePayload.sub) {
				console.warn('Payload incompleto. Token inválido.');
				return done(null, false);
			}

			const user = { userId: josePayload.sub, role: josePayload.role };
			console.log('Autenticación JWT exitosa para el usuario:', user);
			return done(null, user);
		} catch (error) {
			console.error('Error durante la validación del JWT:', error);
			return done(error, false);
		}
	},
);
