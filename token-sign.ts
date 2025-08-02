import { JWTPayload, SignJWT } from 'jose';

export interface MyTokenPayload extends JWTPayload {
  sub: string;
  role: string;
  email?: string;
  permissions?: string[]; // La propiedad 'permissions' es opcional
  // Añade aquí cualquier otro dato que esperes en el payload
}


export const secret = 'myCat' 
const payload = {
    sub: "1", 
    role: 'customer' 
}

export async function signToken (payload: MyTokenPayload, secret: string) {
 // jose requiere que el secreto sea una Uint8Array.
  // Es crucial que el secreto sea robusto y mantenido de forma segura.
  const secretBytes = new TextEncoder().encode(secret);

   const token = await new SignJWT(payload)
    .setProtectedHeader({ alg: 'HS256' }) // Define el algoritmo de firma. HS256 es común.
    .setIssuedAt() // Establece el tiempo de emisión del token. Buena práctica.
    // .setExpirationTime('1h') // Opcional: añade un tiempo de expiración (ejemplo: '1h', '2 days', etc.)
    // .setIssuer('urn:example:issuer') // Opcional: Quién emitió el token
    // .setAudience('urn:example:audience') // Opcional: Para quién es el token
    .sign(secretBytes); // Firma el token con el secreto

    return token;
}

async function prueba() {
    const token = await signToken(payload, secret);
    console.log(token);
}

prueba()