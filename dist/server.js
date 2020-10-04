"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const mongoose = require('mongoose');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const port = 8080;
const url = 'mongodb+srv://Admin:AfIeOyXnnMy6Gs7q@cluster0.65cbx.mongodb.net';
const app = express();
const admin_1 = require("./routers/admin");
mongoose.connect(url, { useUnifiedTopology: true, useNewUrlParser: true }, () => console.log('Mongo OK'));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cookieParser());
app.use(cors());
app.get('/', (req, res) => {
    res.send('Api is working ?');
});
app.get('/test', (req, res) => {
    res.send('API');
});
app.get('/admin/router', (req, res) => {
    res.send('admin router');
});
// app.use('/auth', require('./routers/auth'));
app.use('/admin', admin_1.adminRouter);
app.listen(port, function () {
    console.log(`Running on ${port}`);
});
//# sourceMappingURL=server.js.map