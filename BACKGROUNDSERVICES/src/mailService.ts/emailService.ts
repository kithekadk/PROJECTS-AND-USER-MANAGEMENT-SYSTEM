import ejs from 'ejs'
import mssql from 'mssql'
import { sqlConfig } from '../config/config'
import sendMail from '../helpers/emailhelper';
import dotenv from 'dotenv'
dotenv.config()

interface Task {
    projectId : number;
    projectName: string,
    description: string,
    endDate:string,
    userId:string
    email:string
    sentEmail:number
}

const SendEmails = async()=>{
    const pool = await mssql.connect(sqlConfig)
    const projects:Task[]=await(await pool.request()
    .query('SELECT email FROM dbo.USERS u INNER JOIN dbo.PROJECTS p ON p.userId = u.userId WHERE status=1 AND sentEmail=0')).recordset
    console.log(projects);

    for (let project of projects){
        ejs.renderFile('template/template.ejs',{name:project.projectName, taskdesc:project.description}, async(error,data)=>{
            let mailOptions = {
                from: process.env.EMAIL as string,
                to: project.email, 
                subject: "Task Completion",
                html:
                `<div><p>Hello sir, this is to notify you on task completion</p>
                <p>Kindly have a review</p></div>`,
                attachment:[
                    {
                    filename: 'task.txt',
                    content: `This was a nice project sir, i look forward to joining a new projecct`
                }
            ]
            }
    try {
        await sendMail (mailOptions);
        await pool.request().query(`UPDATE dbo.PROJECTS SET sentEmail = 1 WHERE status = 1 `);
        console.log("email sent");
    } catch (error) {
        console.log(error)
    }
        })
        
        
    }
    
}
   
    
export default SendEmails