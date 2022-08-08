"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.notifyAdmin = void 0;
const nodemailer_1 = __importDefault(require("nodemailer"));
/**
 * notify the admin on task completion
 */
function notifyAdmin() {
    let transporter = nodemailer_1.default.createTransport({
        service: 'gmail',
        host: 'smtp.gmail.com',
        port: 587,
        requireTLS: true,
        auth: {
            user: process.env.EMAIL,
            pass: process.env.PASSWORD
        }
    });
    let mailOptions = {
        from: process.env.EMAIL,
        to: "kakinyidk@gmail.com",
        subject: "Task Completion",
        html: `<div><p>Hello sir, this is to notify you on task completion</p>
        <p>Kindly have a review</p></div>`,
        attachment: [{
                filename: "project report",
                content: `This was a nice project sir, i look forward to joining a new projecct`
            }]
    };
    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error);
        }
        else {
            console.log("email sent", info.response);
        }
    });
}
exports.notifyAdmin = notifyAdmin;
