import bcrypt from 'bcrypt';

async function crypt_password(password: string){
	return await bcrypt.hash(password, 10);
}

async function compare_pass(real_password: string, password: string){
	return await bcrypt.compare(password, real_password);
}

module.exports = {crypt_password, compare_pass};