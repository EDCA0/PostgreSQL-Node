import * as bcrypt from 'bcrypt'

async function verifyPassword() {
    const myPassword = 'admin123 .2020';
    const hash = '$2b$10$Td1g7vgjNYP/IvDz9i104u86JY5sn2c4ehi.y/xxiHpTWEon5xAzW'
    const verifiedHash = await bcrypt.compare(myPassword, hash);
    console.log(verifiedHash)
}

verifyPassword();