const Auth = require('../models/auth');

async function add_user(email: string, password: string){
	try {
		email = email.toLowerCase();
		const find = await get_user_by_email(email);
		if (find) return false;
		else {
			const add = await new Auth({
				email: email,
				password: password,
				moment: new Date().toString(),
			}).save();
			return true;
		}
	}
	catch (e){
		console.log(e);
		return false;
	}
}

async function get_all_users(){
	try {
		return (await Auth.find({}));
	}
	catch (e){
		console.log(e)
		return false;
	}
}

async function get_user_by_email(email: string){
	try {
		email = email.toLowerCase();
		const find = await Auth.findOne({
			email: email,
		});
		if (find) return find;
		else return false;
	}
	catch (e){
		console.log(e);
		return false;
	}
}

module.exports = {add_user, get_all_users, get_user_by_email};