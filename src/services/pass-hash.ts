import * as bcrypt from 'bcrypt';

async function hashPassword() {
	const myPassword = 'admin123 .2020';
	const hash = await bcrypt.hash(myPassword, 10);
	console.log(hash);
}

hashPassword();
