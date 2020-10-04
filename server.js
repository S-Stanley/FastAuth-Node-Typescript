"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const mongoose = require('mongoose');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const port = 8080;
const url = 'mongodb+srv://Admin:AfIeOyXnnMy6Gs7q@cluster0.65cbx.mongodb.net';
const app = express();
const admin_1 = require("./routers/routes/admin/admin");
const auth_1 = require("./routers/routes/auth/auth");
mongoose.connect(url, { useUnifiedTopology: true, useNewUrlParser: true }, () => console.log('Mongo OK'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());
app.use(cors());
app.get('/', (req, res) => {
    res.send('Api is working');
});
app.use('/auth', auth_1.authRouter);
app.use('/admin', admin_1.adminRouter);
app.listen(port, function () {
    console.log(`Running on ${port}`);
});
