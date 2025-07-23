import { FindManyOptions } from 'typeorm';
import { CreateOrderProductDto } from '../dtos/create-orderProduct.dto';
import { Orders, Products } from '../entity';
import { OrderProduct } from '../entity/order-product';
import { NotFoundError } from '../utils/httpErrors';

export class OrderProductService {
    constructor() {}

    async create(body: CreateOrderProductDto): Promise<OrderProduct> {
        const orderExists = await Orders.findOne({
            where: {
                id: body.order
            },
        });
        console.log(orderExists);

        if (!orderExists) {
            throw new NotFoundError('El id De la orden no existe');
        }

        const productExists = await Products.findOne({
            where: {
                id: body.product
            },
        });
        console.log(productExists);

        if (!productExists) {
            throw new NotFoundError('El id Del producto no existe');
        }

        const newOrderProduct = new OrderProduct();

        Object.assign(newOrderProduct, body);

        await newOrderProduct.save();
        return newOrderProduct;
    }

    async find(skip? : number, take? : number, sortByColumn?: string, sortDirection?: string): Promise<OrderProduct[]> {
        const findOptions: FindManyOptions<OrderProduct> = {};

        if (typeof skip === 'number' && skip >= 0) {
          findOptions.skip = skip;
        }
    
        if (typeof take === 'number' && take > 0) {
          findOptions.take = take;
        }
    
        // **Validación y asignación para la ordenación flexible:**
        if (sortByColumn && sortDirection) {
          const normalizedSortDirection = sortDirection.toUpperCase();
          const allowedSortColumns = ['id', 'order', 'product', 'amount', 'createdAt', 'updatedAt']; 
        
          if (allowedSortColumns.includes(sortByColumn) && (normalizedSortDirection === 'ASC' || normalizedSortDirection === 'DESC')) {
            findOptions.order = {
              [sortByColumn]: normalizedSortDirection as 'ASC' | 'DESC', // Usar corchetes para nombre de propiedad dinámico
            };
          } else {
            console.warn(`!!!!!!Parámetros de ordenamiento inválidos: columna '${sortByColumn}' o dirección '${sortDirection}'. Se ignorará el ordenamiento.!!!!!!`);
            // Opcional: lanzar un error
            // throw new Error(`Invalid sort parameters: column '${sortByColumn}' or direction '${sortDirection}'.`);
          }
        }

        const orderProducts: OrderProduct[] = await OrderProduct.find(findOptions);

        return orderProducts;
    }

    async findOne(id: number): Promise<OrderProduct> {
        const orderProduct = await OrderProduct.findOne({
            where: {
                id: id,
            },
            relations: {
                order: true,
                product: true,
            },
        });

        if (!orderProduct) {
            throw new NotFoundError('OrderProduct not found');
        }

        return orderProduct;
    }

    async delete(id: number): Promise<void> {
        await this.findOne(id);
        await OrderProduct.delete(id);
    }
}
