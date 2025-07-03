import  express, {Request, Response, Router} from "express";
import { userService } 											 from "../services/user.service";

export const usersRouter : Router = express.Router()
const service = new userService()

usersRouter.get('/', (request : Request, response : Response) => {
	// const limit  : number = parseInt(request.query.limit as string, 10);
	// const offset : number = parseInt(request.query.offset as string, 10);
	const users  = service.find();

// ToDo => Implementar
	// if(limit && offset) {
	// 	if(isNaN(limit) || isNaN(offset)) {
	// 		return response.status(400).json( {
	// 			error: 'Limit y offset deben ser numeros'
	// 		});
	// 	}
	// 	if(limit >= 0 && offset >= 0){
	// 		response.json({
	// 			limit,
	// 			offset
	// 		});
	// 	} else {
	// 		return response.status(400).json( {
	// 			error: 'Limit y offset deben ser mayores o iguales a 0'
	// 		});
	// 	}
	// }

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
