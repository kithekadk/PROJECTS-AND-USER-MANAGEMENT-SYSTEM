import dotenv from 'dotenv';
import { NextFunction, Request, Response } from 'express';
dotenv.config();
import jwt from 'jsonwebtoken';
import {Data} from '../Interfaces/project'

export interface ExtendedData extends Request{
    info?:Data
}

export const verifyToken = (req:ExtendedData, res:Response, next:NextFunction)=>{

    try {
        const token = req.headers['token'] as string;

        if(!token){
            return res.status(404).json({
                message: "Permission set denies you access"
            })
        }
        const data = jwt.verify(token, process.env.KEY as string) as Data;
        req.info = data
        
    } catch (error) {
        res.json({
            message: error
        })
    }
    next();
}