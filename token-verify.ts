import { jwtVerify } from "jose";

async function validateToken(token : string, secret: string) {
    const new_secret = new TextEncoder().encode(secret)
    const resposne = await jwtVerify(token, new_secret)

    console.log(resposne)
}

validateToken('eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIxIiwicm9sZSI6ImN1c3RvbWVyIiwiaWF0IjoxNzUzNDQzODI0fQ.FeGHr1VBKM0ARIVPQ8LCWYT2HS2yML1lFivXyQ7BkKY', 'myCat')