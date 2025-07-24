import cors, { CorsOptions } from 'cors';
import express, { Request, Response } from 'express';
import 'reflect-metadata';
import { errorHandler, logErrors } from '../src/middlewares/error.handler';
import { authRouter } from '../src/routes/auth.route';
import '../src/utils/auth/index';

export const app = express();

app.use(express.json());

const whitelist = ['http://localhost:3000', 'https://myapp.co'];
const options: CorsOptions = {
	origin: (
		requestOrigin: string | undefined,
		callback: (err: Error | null, allow?: boolean) => void,
	) => {
		if (!requestOrigin || whitelist.includes(requestOrigin)) {
			callback(null, true);
		} else {
			callback(new Error('Acceso denegado por políticas de CORS'));
		}
	},
};

app.use(cors(options));
app.use('/auth', authRouter)


app.use(logErrors);
app.use(errorHandler);

app.use((request: Request, response: Response) => {
	response.status(404).json({
		message: 'Endpoint not found',
	});
});

export default app
