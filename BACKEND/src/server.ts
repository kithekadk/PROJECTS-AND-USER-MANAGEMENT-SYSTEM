import express, { json, NextFunction, Request, Response } from 'express';
import router from "./Routers/projectRoutes"

const app = express();

app.use(json());
app.use (('/user'), router)

app.use ((err:Error, req:Request, res:Response, next:NextFunction)=>{
    res.json({message:err.message})
})

app.listen(5000, ()=>{
    console.log('server listening...')
})