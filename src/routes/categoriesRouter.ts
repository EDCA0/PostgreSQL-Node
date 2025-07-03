import express, { Router, Request, Response, NextFunction} from 'express';

import { validationHandler } from '../middlewares/validator.handler';
import { CategoryService } from '../services/category.service';
import { CreateCategoryDto, UpdateCategoryDto} from '../dtos';
import { IApiResponse, ICategory} from '../models';


export const categoriesRouter : Router = express.Router();
const service = new CategoryService();

// POST (crear uno)
categoriesRouter.post('/', validationHandler(CreateCategoryDto), async (request : Request, response : Response, next : NextFunction) => {
    try {
        const body : CreateCategoryDto = request.body;
        const newCategory = await service.create(body);

        const apiResponse : IApiResponse<ICategory> = {
            statusCode : 201,
            success : true,
            data : newCategory
        }
        
        response.status(201).json(apiResponse);
    } catch (error) {
        next(error);
    }
})

// GET (traer todos)
categoriesRouter.get('/', (request : Request, response : Response, next : NextFunction) => {
    try {
        const categories : ICategory[] =service.find()
        
        const apiResponse : IApiResponse<ICategory[]> = {
            success : true,
            statusCode : 200,
            data: categories
        }

        response.status(200).json(apiResponse);
    } catch (error) {
        next(error);
    }
})

// GET (Traer uno)
categoriesRouter.get('/:id', async (request : Request, response : Response, next : NextFunction) => {
    try {
        const id = request.params.id;
        const category = await service.findOne(id);

        if(!category) {
            throw new Error ('La categoria no fue encontrada');
        }

        const apiResponse : IApiResponse<ICategory> = {
            statusCode : 200,
            success : true,
            data : category
        }

        response.status(200).json(apiResponse);
    } catch (error) {
        next(error);
    }
});

// PATCH (actualizacion parcial por ID) 
categoriesRouter.patch('/:id', validationHandler(UpdateCategoryDto), async (request : Request, response : Response, next : NextFunction) => {
    try {
        const id : string = request.params.id;
        const body : UpdateCategoryDto = request.body;
        const updatedCategory = await service.updatePatch(id, body);

        const apiResponse : IApiResponse<ICategory> = {
            success : true,
            statusCode : 200,
            data : updatedCategory
        }

        response.status(200).json(apiResponse);
    } catch (error) {
        next(error);
    }
});

// PUT (actualizacion total por ID) 
categoriesRouter.put('/:id', validationHandler(UpdateCategoryDto), async (request : Request, response : Response, next : NextFunction) => {
    try {
        const id : string = request.params.id;
        const body : ICategory = request.body;
        const updatedCategory = await service.updatePut(id, body);

        const apiResponse : IApiResponse<ICategory> = {
            success : true,
            statusCode : 200,
            data : updatedCategory
        }

        response.status(200).json(apiResponse);
    } catch (error) {
        next(error);
    }
}) 

categoriesRouter.delete('/:id', (request : Request, response : Response, next : NextFunction) => {
    try {
        const id : string = request.params.id;
        service.delete(id);

        response.sendStatus(204);
    } catch (error) {
        next(error);
    }
});