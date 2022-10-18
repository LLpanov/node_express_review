import path from 'path';
import EmailTemplate from 'email-templates';
import nodemailer, { SentMessageInfo } from 'nodemailer';

import { rootDir } from '../app';
import { config } from '../config';
import { EmailActionEnum, emailInfo } from '../constans';

class EmailService {
    async sendEmail(userEmail:string, action:EmailActionEnum, context = {})
        :Promise<SentMessageInfo> {
        const { subject, templateName } = emailInfo[action];

        const templateRenderer = new EmailTemplate({
            views: {
                root: path.join(rootDir, 'email-templates'),
            },
        });

        const emailTransport = nodemailer.createTransport({
            from: 'express_okten',
            to: userEmail,
            service: 'gmail',
            auth: {
                user: config.ROOT_EMAIL,
                pass: config.ROOT_PASSWORD,
            },
        });

        Object.assign(context, { frontendUrl: 'https://google.com.ua' });

        const html = await templateRenderer.render(templateName, context);

        return emailTransport.sendMail({
            to: userEmail,
            subject,
            html,
        });
    }
}

export const emailService = new EmailService();
