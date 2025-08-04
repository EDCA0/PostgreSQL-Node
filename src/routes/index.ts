import express, { Application, Router } from 'express';

import { checkApiKey } from '../middlewares/auth.handler';
import { authRouter } from './auth.route';
import { categoriesRouter } from './categories.route';
import { customerRouter } from './customer.route';
import { inicioRouter } from './inicio.route';
import { ordersRouter } from './order.route';
import { orderProductRouter } from './orderProduct.route';
import { productsRouter } from './products.route';
import { usersRouter } from './users.route';
import { profileRouter } from './profile.route';

export function routerApi(app: Application): void {
	const router: Router = express.Router();
	app.use('/api/v1', router);

	router.use('/categories', checkApiKey, categoriesRouter);
	router.use('/inicio', inicioRouter);
	router.use('/products', productsRouter);
	router.use('/users', usersRouter);
	router.use('/customers', customerRouter);
	router.use('/orders', ordersRouter);
	router.use('/orderProduct', orderProductRouter);
	router.use('/auth', authRouter);
	router.use('/profile', profileRouter);
}
