import {
	BaseEntity,
	Column,
	Entity,
	JoinColumn,
	OneToOne,
	PrimaryGeneratedColumn,
} from 'typeorm';
import { Users } from './user';

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
	declare userId: Users;

	@Column({
		name: 'createdAt',
		nullable: false,
		type: 'date',
		default: () => 'now()',
	})
	declare createdAt: Date;

	@Column({
		name: 'updatedAt',
		nullable: true,
		type: 'date',
	})
	declare updatedAt: Date;
}
