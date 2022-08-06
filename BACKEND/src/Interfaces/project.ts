import { Request } from "express";

export interface customProject extends Request{
    body:{
        projectName:string,
        description: string,
        endDate:string,
        assignedTo:string
    }
}