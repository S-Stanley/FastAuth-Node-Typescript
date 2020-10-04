import { timeStamp } from 'console';
import * as mongoose from 'mongoose';

const AuthSchema = new mongoose.Schema({
	email: {
		type: String,
		required: true,
	},
	password: {
		type: String,
		required: true,
	},
	moment: {
		type: String,
		required: true,
	},
});

module.exports = mongoose.model('Auth', AuthSchema);