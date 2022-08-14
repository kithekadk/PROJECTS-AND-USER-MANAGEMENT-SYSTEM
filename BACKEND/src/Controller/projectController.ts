import mssql, { pool, RequestError } from 'mssql'
import { sqlConfig } from '../Config/config';
import { projectUserSchema, taskValidator } from '../Helper/projectValidator';
import { customProject, Project } from '../Interfaces/project';
import { Response } from 'express';
import {ExtendedData} from '../Middleware/tokenVerify';
import {userInfo} from '../Interfaces/user';

/**
 * 
 * @param req - Request as customProject
 * @param res - Request as Response
 * @returns 
 */
export const createProject = async(req:customProject, res:Response)=>{
    try {
    
        const {projectName, description, endDate, userId}= req.body;
        
        const {error, value} = taskValidator.validate(req.body);
        if(error){            
            return res.status(400).json({
                message:error.details[0].message
            })
        }

        const pool = await mssql.connect(sqlConfig)
        if(pool.connected){
            console.info("db connected");
            
        }
        await pool.request()
        
        .input('projectName', mssql.VarChar, projectName)
        .input('description', mssql.VarChar, description)
        .input('deadline', mssql.VarChar, endDate)
        .input('userId', mssql.VarChar, userId)
        .execute('createTask')

        return res.json({message:"Project created successfully..." })

    } catch (error) {
        if (error instanceof RequestError)
           return res.status(404).json({
                message:'Project Exists.'
            })
        
        return res.status(500).json({
            message:'Internal Server Error.'
        })
    }
}

//=========DELETING PROJECTS ===============//
/**
 * 
 * @param req as customproject
 * @param res as response
 * @returns deletes projects.
 */

export const projectDelete = async(req:customProject, res:Response)=>{
    try {
        const {projectId}=req.body

        const pool = await mssql.connect(sqlConfig)
        await pool.request()
        .input('projectId',mssql.VarChar, projectId)
        .execute('deleteProject')

        return res.json({message: `PROJECT ${projectId} deleted`}) 
    } catch (error) {
        if(error instanceof RequestError){
            return res.status(404).json({
                message:"No Task With That ID."
            })
        }
    }
}

export const projectAssign = async(req:customProject, res:Response)=>{
    try {
        const {projectId, userId} = req.body;

        const{error, value} = projectUserSchema.validate(req.body)
        if(error){
            res.status(400).json({
                message: error.details[0].message
            })
        }
        const pool = await mssql.connect(sqlConfig);

        await pool.request()
        .input('projectId', mssql.VarChar, projectId)
        .input('userId', mssql.VarChar, userId)
        .execute('assignProject');

        res.json({message: `User ${userId} assigned to project ${projectId}`})
    } catch (error) {
        if (error instanceof RequestError){
            res.status(400).json({
                message:error.message
            })
        }

    }
}

export const homePage = async(req:ExtendedData, res:Response)=>{
    try {
    if (req.info){
        return res.json({message:"welcome to the homepage"})
    }    
    } catch (error) {
        console.log(error);
        
    }   
}


export const checkUserRole = async(req:ExtendedData, res:Response)=>{
    if (req.info){
        res.json({email: req.info.email , role: req.info.role})
    }
}

export const pendingProjects = async (req:customProject, res:Response)=>{
    try {
        const pool = await mssql.connect(sqlConfig);

        const project: Project[]= await(
        await pool.request()
        .execute('pendingProjects')).recordset

        res.status(200).json({
            project
        })
    } catch (error) {
        error
    }
}

export const completeProjects = async (req:customProject, res:Response)=>{
    try {
        const pool = await mssql.connect(sqlConfig)

        const projectcomplete:Project[] = await(
        await pool.request()
        .execute('completeProjects')).recordset

        res.status(200).json({
            projectcomplete
        })
    } catch (error) {
        error
    }
}