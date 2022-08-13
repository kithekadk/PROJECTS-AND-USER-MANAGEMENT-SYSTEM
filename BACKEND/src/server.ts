import express, { json, NextFunction, Request, Response } from 'express';
import router from "./Routers/projectRoutes"
import userRouter from './Routers/userRoutes';
import cors from 'cors'

const app = express();

app.use(json());
app.use(cors())
app.use (('/projects'), router);
app.use (('/users'), userRouter);

app.use ((err:Error, req:Request, res:Response, next:NextFunction)=>{
    res.json({message:err.message})
})

app.listen(5000, ()=>{
    console.log('server listening...')
})


