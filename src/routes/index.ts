import express, { Application, Router } from 'express';

import { inicioRouter } from './inicioRouter';
import { productsRouter } from './productsRouter';
import { usersRouter } from './usersRouter';
import { categoriesRouter } from './categoriesRouter';

export function routerApi(app: Application): void {
	const router: Router = express.Router();
	app.use('/api/v1', router);

	router.use('/categories', categoriesRouter);
	router.use('/inicio', inicioRouter);
	router.use('/products', productsRouter);
	router.use('/users', usersRouter);
}
