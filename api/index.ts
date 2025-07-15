import 'dotenv/config'
import app from "./app";
import { AppDataSource } from "../src/data-source"


async function main () {
    try {
        await AppDataSource.initialize();
        console.log('Base de datos conectada correctamente');

        const port : Number = Number(process.env.PORT) || 3000
        
        app.listen(port, () => {
            console.log('Servidor escuchando en el puerto ', port)
        })
    } catch (error) {
        console.error('Error al conectar a la base de datos: ', error)
    }
}
main();