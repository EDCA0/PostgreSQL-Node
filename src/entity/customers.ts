import {
	BaseEntity,
	Column,
	CreateDateColumn,
	Entity,
	JoinColumn,
	OneToOne,
	PrimaryGeneratedColumn,
	UpdateDateColumn,
} from 'typeorm';
import { Users } from './users';

@Entity('customers')
export class Customers extends BaseEntity {
	@PrimaryGeneratedColumn()
	declare id: number;

	@Column({
		name: 'customerName',
		nullable: false,
		type: 'varchar',
		length: 20,
	})
	declare customerName: string;

	@Column({
		name: 'customerLastName',
		nullable: false,
		type: 'varchar',
		length: 30,
	})
	declare customerLastName: string;

	@Column({
		name: 'customerPhone',
		nullable: true,
		type: 'varchar',
	})
	declare customerPhone: string;

	@OneToOne(() => Users)
	@JoinColumn({
		name: 'userId',
	})
	declare user: Users;

	@CreateDateColumn({
		name: 'created_at',
		type: 'timestamp',
		comment: 'Fecha y hora de creacion del usuario',
	})
	declare createdAt: Date;

	@UpdateDateColumn({
		name: 'updated_at',
		type: 'timestamp',
		comment: 'Fecha y hora de actualizacion del usuario',
	})
	declare updatedAt: Date;
}
