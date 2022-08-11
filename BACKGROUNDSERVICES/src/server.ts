import express from 'express'
import cron from 'node-cron'
import SendEmails from './mailService.ts/emailService'
const app = express()

const run =() =>{
    cron.schedule('* * * * *', async()=>{
        console.log("cron is running");
        await SendEmails();
        
    })
}
run()

app.listen(5500,()=>{
    console.log("mail server started...");
    
})