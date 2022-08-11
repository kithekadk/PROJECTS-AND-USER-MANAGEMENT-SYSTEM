import { Request, Response } from "express";
import mssql, { RequestError } from "mssql";
import { sqlConfig } from "../Config/config";
import { userLoginValidator, userValidator } from "../Helper/userValidator";
import { CustomUser } from "../Interfaces/user";
import { User } from "../Interfaces/user";
import { customProject } from "../Interfaces/project"
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken';
import { projectUserSchema } from "../Helper/projectValidator";
import nodemailer from 'nodemailer'
import dotenv from 'dotenv'
// import { any } from "joi";
dotenv.config();

export const registerUser = async(req:CustomUser, res:Response)=>{
    try {
        const {firstName, lastName, email, password}= req.body;
        const {error, value} = userValidator.validate(req.body)
        const hashedPwd = await bcrypt.hash(password,8)
        if(error){
            return res.status(400).json({
                message:error.details[0].message})
        }

        const pool = await mssql.connect(sqlConfig)

        await pool.request()
        .input('firstName', mssql.VarChar, firstName)
        .input('lastName', mssql.VarChar, lastName)
        .input('email', mssql.VarChar, email)
        .input('password', mssql.VarChar, hashedPwd)

        .execute('createUser')
        return res.status(200).json({
            message:"Account created successfully"
        })
    } catch (error) {
        return res.status(404).json({
            message: "User Already Exists"
        })
    }
}


export const loginUser = async(req:CustomUser, res:Response)=>{
    try {
        const {email, password}= req.body;

        const {error, value}= userLoginValidator.validate(req.body);
        if(error){
            return res.status(404).json({
                message: error.details[0].message
            })
        }

        const pool = await mssql.connect(sqlConfig);

        const user:User[] = ( await pool.request()
        .input('email', mssql.VarChar, email)
        .execute('loginUser')).recordset
        
  
        const validPassword = await bcrypt.compare(password, user[0].password)
        if (!validPassword){
            return res.status(400).json({
                message:"invalid password"
            })
        }
        const logins = user.map(item =>{
            const{password, ...rest}=item;
            return rest;
        })
        const token = jwt.sign (logins[0], process.env.KEY as string, {expiresIn:'300s'})
        return res.status(200).json({
            message: "Logged in successfully", token
        })
    } catch (error) {
            return res.status(400).json({
            message:error
        })
    }
}

//SETTING PROJECT COMPLETE
/**
 * 
 * @param req REQUEST A PROJECT ID AND USER ID FROM USER
 * @param res RESPONSE
 * @returns RETURN A RESPONSE BASED ON USERS INPUT
 */

export const updateComplete = async (req:customProject, res:Response)=>{
    try {
        const {projectId, userId}= req.body;
        const {error, value }= projectUserSchema.validate(req.body)
        if(error){
            return res.status(400).json({
                message:error.details[0].message
            })
        }
        const pool = await mssql.connect(sqlConfig);

        await pool.request()
        .input('projectId', mssql.VarChar, projectId)
        .input('userId', mssql.VarChar, userId)
        .execute('setComplete')

        return res.status(200).json({
            message: "Task completed"
        })
    } catch (error) {
        if(error instanceof RequestError){
            res.status(404).json({
                message:"No Pending project with that ProjectId"
            })
        }
        else{
            res.status(500).json({
                message:"Internal Server Error"})
        }
    }
}
