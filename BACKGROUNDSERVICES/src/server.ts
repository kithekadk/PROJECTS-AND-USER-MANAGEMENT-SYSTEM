import express from 'express'
import cron from 'node-cron'
import AssignProjectMails from './mailService.ts/assignedProjectmails'
import SendEmails from './mailService.ts/emailService'
const app = express()

const run =() =>{
    cron.schedule('*/5 * * * * *', async()=>{
        console.log("cron is running");
        await SendEmails()
        await AssignProjectMails()
        
    })
}
run()

app.listen(5500,()=>{
    console.log("mail server started...");
    
})