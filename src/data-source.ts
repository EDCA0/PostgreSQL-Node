import 'dotenv/config';
import 'reflect-metadata';
import { DataSource, DataSourceOptions } from 'typeorm';
import { Categories, Customers, Orders, Products, Users } from './entity';
import { OrderProduct } from './entity/order-product';

const DB_USER = encodeURIComponent(process.env.dbUser || 'edca');
const DB_PASSWORD = encodeURIComponent(process.env.dbPassword || 'admin1234');
const DB_HOST = process.env.dbHost || 'localhost';
const DB_PORT = process.env.dbPort ? parseInt(process.env.dbPort) : 5432;
const DB_NAME = process.env.dbName || 'my_store';

const DATABASE_URL = `postgresql://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}/${DB_NAME}`;

export const dataSourceOptions: DataSourceOptions = {
	type: 'postgres',
	url: DATABASE_URL,
	synchronize: false,
	logging: true,
	entities: [Users, Customers, Products, Categories, Orders, OrderProduct],
	migrations: ['src/migrations/*.ts'],
	subscribers: [],
};

export const AppDataSource = new DataSource(dataSourceOptions);
