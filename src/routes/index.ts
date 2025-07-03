import  express, {Application, Router}   				 from 	"express";

import { inicioRouter }   	 	 	 								 from 	'./inicioRouter';
import { productsRouter } 	 	   								 from 	'./productsRouter';
import { usersRouter } 	   	 	 	 								 from 	'./usersRouter';

export function routerApi(app : Application) : void{
	const router  : Router = express.Router();
	app.use('/api/v1', router);

	router.use('/products', 		productsRouter);
	router.use('/users', 				usersRouter);
	router.use('/inicio', 			inicioRouter);
}
