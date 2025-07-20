import express, { Request, Response, Router } from 'express';

export const inicioRouter: Router = express.Router();

inicioRouter.get('/', (request: Request, response: Response) => {
	response.send('Hola este es el inicio del servidor');
});
