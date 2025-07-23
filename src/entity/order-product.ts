import {
	BaseEntity,
	Column,
	CreateDateColumn,
	Entity,
	JoinColumn,
	ManyToOne,
	PrimaryGeneratedColumn,
	UpdateDateColumn,
} from 'typeorm';
import { Orders } from './orders';
import { Products } from './products';

@Entity('order-product')
export class OrderProduct extends BaseEntity {
	@PrimaryGeneratedColumn({
		name: 'id',
		comment: 'id de la linea de pedido, generado automaticamente',
	})
	declare id: number;

	@Column({
		type: 'int',
		nullable: false,
		comment: 'Cantidad del producto en esta linea de pedido',
	})
	declare amount: number;

	@ManyToOne(() => Orders, (order) => order.orderProduct, {
		onUpdate: 'CASCADE',
		onDelete: 'SET NULL',
	})
	@JoinColumn({ name: 'order_id' })
	declare order: Orders;

	@ManyToOne(() => Products, (product) => product.orderProduct, {
		onUpdate: 'CASCADE',
		onDelete: 'SET NULL',
	})
	@JoinColumn({ name: 'product_id' })
	declare product: Products;

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
