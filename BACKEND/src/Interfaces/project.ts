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