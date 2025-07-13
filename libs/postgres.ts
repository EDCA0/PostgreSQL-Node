import {Client} from 'pg'

export async function getConnection () : Promise<Client> {
      const client = new Client({
        host: 'localHost',
        port : 5555,
        user: 'edca',
        password: 'admin123',
        database: 'my_store'

    })

    await client.connect();
    return client
}