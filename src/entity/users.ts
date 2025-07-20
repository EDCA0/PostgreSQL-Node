import {
	BaseEntity,
	Column,
	CreateDateColumn,
	Entity,
	OneToOne,
	PrimaryGeneratedColumn,
	UpdateDateColumn,
} from 'typeorm';
import { Gender } from '../models';
import { Customers } from './customers';

@Entity('users')
export class Users extends BaseEntity {
	@PrimaryGeneratedColumn({
		name: 'user_id',
		comment: 'id del usuario, generado automaticamente, es unico por usuario',
	})
	declare id: number;

	@Column({
		name: 'user_name',
		type: 'varchar',
		length: 60,
		nullable: false,
		comment: 'nombre del usuario',
	})
	declare userName: string;

	@Column({
		name: 'user_email',
		type: 'varchar',
		length: 200,
		unique: true,
		nullable: false,
		comment: 'Correo del usuario, es unico',
	})
	declare userEmail: string;

	@Column({
		name: 'user_password',
		type: 'varchar',
		length: 100,
		nullable: false,
		comment: 'contraseña del usuario',
	})
	declare userPassword: string;

	@Column({
		name: 'user_address',
		type: 'varchar',
		length: 100,
		nullable: false,
		comment: 'Direccion del usuario',
	})
	declare userAddress: string;

	@Column({
		name: 'user_phone_number',
		type: 'varchar',
		length: 30,
		nullable: false,
		comment: 'Numero de telefono del usuario',
	})
	declare phone: string;

	@Column({
		name: 'user_gender',
		nullable: false,
		enum: Gender,
	})
	declare userGender: Gender;

	@Column({
		name: 'user_role',
		nullable: false,
		type: 'varchar',
		default: 'customer',
	})
	declare userRole: string;

	@OneToOne(() => Customers, (customer) => customer.user)
	declare customer: Customers;

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
