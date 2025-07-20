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
import { Categories } from './categories';

@Entity('products')
export class Products extends BaseEntity {
	@PrimaryGeneratedColumn({
		name: 'product_id',
		comment: 'Producto, generado automaticamente, es unico por producto',
	})
	declare id: number;

	@Column({
		name: 'product_name',
		type: 'varchar',
		length: 60,
		nullable: false,
		comment: 'nombre del usuario',
	})
	declare productName: string;

	@Column({
		name: 'product_price',
		type: 'int',
		nullable: false,
		comment: 'Precio del producto',
	})
	declare productPrice: number;

	@Column({
		name: 'product_description',
		type: 'varchar',
		length: 100,
		nullable: false,
		comment: 'descripcion del producto',
	})
	declare productDescription: string;

	@Column({
		name: 'product_image',
		type: 'varchar',
		length: 100,
		nullable: false,
		comment: 'Imagen del producto',
	})
	declare productImage: string;

	@CreateDateColumn({
		name: 'created_at',
		type: 'timestamp',
		comment: 'Fecha y hora de creacion del Producto',
	})
	declare createdAt: Date;

	@ManyToOne(() => Categories, (category) => category.products)
	@JoinColumn({ name: 'category_id' })
	declare category: Categories;

	@UpdateDateColumn({
		name: 'updated_at',
		type: 'timestamp',
		comment: 'Fecha y hora de actualizacion del Producto',
	})
	declare updatedAt: Date;
}
