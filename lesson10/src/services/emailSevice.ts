import nodemailer from 'nodemailer';
import { config } from '../config';
import { emailActionEnum, emailInfo } from '../constans';

class EmailService {
    sendEmail(userEmail:string, action:emailActionEnum) {
        const { subject, html } = emailInfo[action];
        const emailTransport = nodemailer.createTransport({
            from: 'express_okten',
            to: userEmail,
            service: 'gmail',
            auth: {
                user: config.ROOT_EMAIL,
                pass: config.ROOT_PASSWORD,
            },
        });

        return emailTransport.sendMail({
            to: userEmail,
            subject,
            html,
        });
    }
}

export const emailService = new EmailService();
