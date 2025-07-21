import {
    BaseEntity,
    CreateDateColumn,
    Entity,
    JoinColumn,
    ManyToOne,
    PrimaryGeneratedColumn,
    UpdateDateColumn
} from 'typeorm';
import { Customers } from './customers';

@Entity('orders')
export class Orders extends BaseEntity {
    @PrimaryGeneratedColumn({
        name: 'order_id',
        comment: 'orden, generado automaticamente, es unico por producto',
    })
    declare id: number;
    
    @ManyToOne(() => Customers, (customer) => customer.order)
    @JoinColumn({ name: 'customer_id' })
    declare customer: Customers;

    @CreateDateColumn({
        name: 'created_at',
        type: 'timestamp',
        comment: 'Fecha y hora de creacion del Producto',
    })
    declare createdAt: Date;



    @UpdateDateColumn({
        name: 'updated_at',
        type: 'timestamp',
        comment: 'Fecha y hora de actualizacion del Producto',
    })
    declare updatedAt: Date;
}
