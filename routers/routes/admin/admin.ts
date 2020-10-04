import express, {Request, Response} from 'express';
export const adminRouter = express.Router();

adminRouter.get('/', function (req:Request, res:Response){
    res.send('Home')
});