import express, {Request, Response}   		 from "express";
import { routerApi } from "./routes";
import {logErrors, errorHandler} from "./middlewares/error.handler"

const app = express();
const port : number = 3000;

app.use(express.json());

routerApi(app);

app.use(logErrors);
app.use(errorHandler);

app.use((request : Request, response : Response) => {
	response.status(404).json({
		message : 'Endpoint not found'
	})
})

app.listen(port, () => {
	console.log('Mi port ', port)
});
