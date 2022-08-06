import mssql, { pool } from 'mssql'
import { v4 as uid } from 'uuid';
import { sqlConfig } from '../Config/config';
import { taskValidator } from '../Helper/projectValidator';
import { customProject } from '../Interfaces/project';
import { Response } from 'express';

export const createProject = async(req:customProject, res:Response)=>{
    try {
        
        const id = uid();
        const {projectName, description, endDate, assignedTo}= req.body;
        
        const {error, value} = taskValidator.validate(req.body);
        if(error){
            res.json({error})
        }

        const pool = await mssql.connect(sqlConfig)
        if(pool.connected){
            console.log("db connected");
            
        }
        await pool.request()
        .input('id', mssql.VarChar, id)
        .input('projectName', mssql.VarChar, projectName)
        .input('description', mssql.VarChar, description)
        .input('deadline', mssql.VarChar, endDate)
        .input('assignedTo', mssql.VarChar, assignedTo)
        .execute('createTask')

        return res.json({message:"Project created successfully..." })

    } catch (error) {
        return res.json({error})
    }
}

//=========DELETING PROJECTS ===============//

export const projectDelete = async(req:customProject, res:Response)=>{
    try {
        const {projectName}=req.body

        const pool = await mssql.connect(sqlConfig)

        await pool.request()
        .input('projectName',mssql.VarChar,projectName)
        .execute('deleteProject')

        return res.json({message: `Task project ${projectName} deleted`})
    } catch (error) {
        return res.json({error})
    }
}


