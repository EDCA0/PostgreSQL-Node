import 'dotenv/config';
import 'reflect-metadata';

import cors, {CorsOptions} from 'cors';
import express, { Request, Response } from 'express';
import { errorHandler, logErrors } from './middlewares/error.handler';
import { routerApi } from './routes';

const app = express();
const port: number = 3000;

app.use(express.json());

const whitelist = ['http://localhost:8080', 'https://myapp.co'];
const options: CorsOptions = {
  origin: (requestOrigin: string | undefined, callback: (err: Error | null, allow?: boolean) => void) => {
    if (!requestOrigin || whitelist.includes(requestOrigin)) {
      callback(null, true);
    } else {
      callback(new Error('Acceso denegado por políticas de CORS'));
    }
  }
};

app.use(cors(options));

routerApi(app);

app.use(logErrors);
app.use(errorHandler);

app.use((request: Request, response: Response) => {
	response.status(404).json({
		message: 'Endpoint not found',
	});
});

app.listen(port, () => {
	console.log('Mi port ', port);
});


