import { CreateOrderDto } from "../dtos/create-order.dto";
import { Customers, Orders } from "../entity";
import { OrderOutput } from "../models";
import { NotFoundError } from "../utils/httpErrors";

export class OrderService {
    constructor () {}

    async create(body: CreateOrderDto) : Promise <Orders> {
        const customerExists = await Customers.findOne({
            where: {
                id: body.customer
            }
        })

        if(!customerExists) {
            throw new NotFoundError('El id del customer no existe');
        }

        const newOrder = new Orders();
        Object.assign(newOrder, body);

        await newOrder.save();
        return newOrder
    }

        async find(): Promise<Orders[]> {
            const orders : Orders[] = await Orders.find();
    
            return orders;
        }
    
        async findOne(id: number): Promise<Orders> {
            const product = await Orders.findOne({
                where: {
                    id: id,
                },
                relations: {
                    customer: {
                        user: true
                    }
                },
            });
    
            if (!product) {
                throw new NotFoundError('Product not found');
            }
    
            return product;
        }
    
        async delete(id: number): Promise<void> {
            await this.findOne(id);
            await Orders.delete(id);
        }
}