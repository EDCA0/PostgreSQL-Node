import "reflect-metadata"
import { DataSource } from "typeorm"
import { Tasks } from "./entity/tasks"

export const AppDataSource = new DataSource({
    type: 'postgres',
    host: 'localhost',
    username: 'edca',
    password: 'admin1234',
    schema: 'public',
    port: 5555,
    database: 'my_store',
    synchronize: false,
    logging: true,
    entities: [Tasks],
    migrations: ['src/migrations/*.ts'],
    subscribers: [],
})
