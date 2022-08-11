import { Request } from "express";

export interface CustomUser extends Request{
    body:{
        firstName: string,
        lastName: string,
        email: string,
        password: string
    }
}

export interface userInfo extends User{
    userinfo?:User;
}

export interface User{
    firstName: string,
    lastName: string,
    email: string,
    password: string
}