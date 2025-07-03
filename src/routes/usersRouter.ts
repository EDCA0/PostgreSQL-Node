import  express, {Request, Response, Router} from "express";
import { userService } 											 from "../services/user.service";

export const usersRouter : Router = express.Router()
const service = new userService()

usersRouter.get('/', (request : Request, response : Response) => {
	const users  = service.find();
	response.json(users);
});

usersRouter.get('/:id', (request : Request, response : Response) => {
	const id : string = request.params.id;
	const user = service.findOne(id);
	response.json({
		message : 'Mensaje enviado',
		data : user
	});
});


usersRouter.post('/', (request : Request, response : Response) => {
	const body = request.body;
	const newBody = service.create(body)
	response.status(201).json({
		message : 'created',
		data : newBody
	})
});

usersRouter.patch('/:id', (request : Request, response : Response) => {
	const  id : string = request.params.id;
	const body = request.body;

	const update = service.updatePath(id, body)
	response.status(202).json({
		message : "Updated",
		data : update
	})
});


usersRouter.put('/:id', (request : Request, response : Response) => {
	const  id : string = request.params.id;
	const body = request.body;

	const update = service.updatePut(id, body);
	response.status(202).json({
		message : "Updated",
		data : update
	})
});

usersRouter.delete('/:id', (request : Request, response : Response) => {
	const  id : string = request.params.id;
 service.delete(id);
	response.status(200).json({
		message : 'Deleted',
		data : `Elemento ${id} eliminado`
	})
})
