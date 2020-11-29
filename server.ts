import express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const port = 8080;
const url = '';
const app = express();

import { adminRouter } from './routers/routes/admin/admin';
import { authRouter } from './routers/routes/auth/auth';

mongoose.connect(url, { useUnifiedTopology: true, useNewUrlParser:true }, () => console.log('Mongo OK'));

app.use(express.urlencoded({extended: true}))
app.use(express.json())
app.use(cookieParser())
app.use(cors())

app.get('/', (req: any, res: any) => {
    res.send('Api is working');
});

app.use('/auth', authRouter);
app.use('/admin', adminRouter);

app.listen(port, function(){
    console.log(`Running on ${port}`)
});