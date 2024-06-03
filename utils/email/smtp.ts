import * as nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  port: 465,
  host: process.env.EMAIL_HOST,
     auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASSWORD,
       },
  secure: true,
});
  
export default transporter;
