import { Router, Request, Response } from 'express';
const Auth = require('../../services/auth/queries/auth');
export const authRouter = Router();
const StringUtils = require('../../utils/string');

authRouter.post('/inscription', async (req: Request, res: Response) => {
	try {
		if (req.body.email === undefined || req.body.password === undefined){
			res.send({res: false});
		}
		else {
			const find = await Auth.get_user_by_email(req.body.email);
			if (find) res.send({res: false, message: 'Ce compte existe déjà'});
			else {
				const add = await Auth.add_user(req.body.email, await StringUtils.crypt_password(req.body.password));
				(add) ? res.send({res: true}) : res.send({res: false, message: 'Il y a eu une erreur'});
			}
		}
	}
	catch (e){
		console.log(e);
		res.send({res: false, message: 'Il y a eu une erreur'});
	}
});

authRouter.post('/connexion', async (req, res) => {
	try {
		if (req.body.email !== undefined && req.body.password !== undefined){
			const user = await Auth.get_user_by_email(req.body.email);
			if (user){
				(await StringUtils.compare_pass(user.password, req.body.password)) ? res.send({res: true}) : res.send({res: false, message: "Mauvais mot de passe"});
			}
			else res.send({res: false, message: "Cette adresse email n'est relié à aucun compte"});
		}
		else {
			res.send({res: false, message: "Nous n'avons pas pu récuperer l'adresse email ou le mot de passe"});
		}
	}
	catch (e){
		console.log(e);
		res.send({res: false, message: 'Il y a eu une erreur'});
	}
});