"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authRouter = void 0;
const express_1 = require("express");
const Auth = require('../../services/auth/queries/auth');
exports.authRouter = express_1.Router();
const StringUtils = require('../../utils/string');
exports.authRouter.post('/inscription', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (req.body.email === undefined || req.body.password === undefined) {
            res.send({ res: false });
        }
        else {
            const find = yield Auth.get_user_by_email(req.body.email);
            if (find)
                res.send({ res: false, message: 'Ce compte existe déjà' });
            else {
                const add = yield Auth.add_user(req.body.email, yield StringUtils.crypt_password(req.body.password));
                (add) ? res.send({ res: true }) : res.send({ res: false, message: 'Il y a eu une erreur' });
            }
        }
    }
    catch (e) {
        console.log(e);
        res.send({ res: false, message: 'Il y a eu une erreur' });
    }
}));
exports.authRouter.post('/connexion', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (req.body.email !== undefined && req.body.password !== undefined) {
            const user = yield Auth.get_user_by_email(req.body.email);
            if (user) {
                (yield StringUtils.compare_pass(user.password, req.body.password)) ? res.send({ res: true }) : res.send({ res: false, message: "Mauvais mot de passe" });
            }
            else
                res.send({ res: false, message: "Cette adresse email n'est relié à aucun compte" });
        }
        else {
            res.send({ res: false, message: "Nous n'avons pas pu récuperer l'adresse email ou le mot de passe" });
        }
    }
    catch (e) {
        console.log(e);
        res.send({ res: false, message: 'Il y a eu une erreur' });
    }
}));
