import express, { Application, Router } from 'express';

import { inicioRouter } from './inicio.route';
import { productsRouter } from './products.route';
import { usersRouter } from './users.route';
import { categoriesRouter } from './categories.route';
import { customerRouter } from './customer.route';

export function routerApi(app: Application): void {
	const router: Router = express.Router();
	app.use('/api/v1', router);

	router.use('/categories', categoriesRouter);
	router.use('/inicio', inicioRouter);
	router.use('/products', productsRouter);
	router.use('/users', usersRouter);
	router.use('/customer', customerRouter);
}
