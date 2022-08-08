import nodemailer from 'nodemailer'
/**
 * notify the admin on task completion
 */
 export function notifyAdmin(){
    let transporter = nodemailer.createTransport({
        service:'gmail',
        host: 'smtp.gmail.com',
        port: 587,
        requireTLS: true,
        auth:{
            user:process.env.EMAIL as string,
            pass:process.env.PASSWORD as string
        }
    })
    
    let mailOptions = {
        from: process.env.EMAIL as string,
        to: "kakinyidk@gmail.com",
        subject: "Task Completion",
        html:
        `<div><p>Hello sir, this is to notify you on task completion</p>
        <p>Kindly have a review</p></div>`,
        attachment:[{
            filename: "project report",
            content: `This was a nice project sir, i look forward to joining a new projecct`
        }]
    }
    
    transporter.sendMail(mailOptions, function(error, info){
        if (error){
            console.log(error);
        }else {
            console.log("email sent", info.response);
            
        }
    })
}
