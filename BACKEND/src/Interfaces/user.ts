import { Request } from "express";

export interface CustomUser extends Request{
    body:{
        firstName: string,
        lastName: string,
        email: string,
        password: string
    }
}