import { Request } from "express";

export interface customProject extends Request{
    body:{
        email:string
        projectId : number;
        projectName: string,
        description: string,
        endDate:string,
        userId:number,
    }
}


export interface Project{
    projectId : number;
    projectName: string,
    description: string,
    endDate:string,
    userId:number
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