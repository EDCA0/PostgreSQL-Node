import express, { NextFunction, Request, Response, Router } from 'express';

import passport from 'passport';

export const authRouter: Router = express.Router();

authRouter.post(
	'/login',passport.authenticate("local", {session: false}),
	async (request: Request, response: Response, next: NextFunction) => {
		try {
			response.json(request.user)
		} catch (error) {
			next(error);
		}
	},
);
