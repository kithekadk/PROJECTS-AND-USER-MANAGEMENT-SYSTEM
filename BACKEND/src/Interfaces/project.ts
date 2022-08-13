import { Request } from "express";

export interface customProject extends Request{
    body:{
        projectId : number;
        projectName: string,
        description: string,
        endDate:string,
        userId:string
    }
}

export interface Data{
    projectId : number;
    projectName: string,
    description: string,
    endDate:string,
    userId:string,
    email:string,
    role:string,
    iat:number,
    exp:number
}