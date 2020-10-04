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
const Auth = require('../models/auth');
function add_user(email, password) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            email = email.toLowerCase();
            const find = yield get_user_by_email(email);
            if (find)
                return false;
            else {
                const add = yield new Auth({
                    email: email,
                    password: password,
                    moment: new Date().toString(),
                }).save();
                return true;
            }
        }
        catch (e) {
            console.log(e);
            return false;
        }
    });
}
function get_all_users() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            return (yield Auth.find({}));
        }
        catch (e) {
            console.log(e);
            return false;
        }
    });
}
function get_user_by_email(email) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            email = email.toLowerCase();
            const find = yield Auth.findOne({
                email: email,
            });
            if (find)
                return find;
            else
                return false;
        }
        catch (e) {
            console.log(e);
            return false;
        }
    });
}
module.exports = { add_user, get_all_users, get_user_by_email };
