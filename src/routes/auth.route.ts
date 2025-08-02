import 'dotenv/config';
import express, { NextFunction, Request, Response, Router } from 'express';
import passport from 'passport';
import { MyTokenPayload, signToken } from '../../token-sign';
import { ApiResponse } from '../models';
import { NotFoundError, UnauthorizedError } from '../utils/httpErrors';

export const authRouter: Router = express.Router();

authRouter.post(
	'/login',
	passport.authenticate('local', { session: false }),
	async (request: Request, response: Response, next: NextFunction) => {
		try {
			const user = request.user;
			const secret = process.env.JWT_SECRET;

			if (!secret) {
				throw new UnauthorizedError(
					'No se encuentra la clave para la autenticacion',
				);
			}

			if (!user?.id || !user.role) {
				throw new NotFoundError('Se necesita el usuario');
			}
			const payload: MyTokenPayload = {
				sub: String(user.id),
				email: user.email,
				role: user.role,
			};

			const token = await signToken(payload, secret);

			const responseApi: ApiResponse<any> = {
				success: true,
				statusCode: 200,
				data: { payload, token },
			};

			response.status(200).json(responseApi);
		} catch (error) {
			next(error);
		}
	},
);
