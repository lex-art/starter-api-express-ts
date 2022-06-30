import nodemailer from 'nodemailer'

export default () => {
    return nodemailer.createTransport({
        host: process.env.HOST_EMAIL,
        port: 465,
        secure: true,
        auth: {
            user: process.env.ACCOUNT_EMAIL,
            pass: process.env.PASS_EMAIL
        },
        tls: {
            rejectUnauthorized: false
        }
      });
}