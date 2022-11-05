import cron from 'node-cron';
import { emailService, userService } from '../services';
import { ErrorHandler } from '../error/ErorrHandler';
import { EmailActionEnum } from '../constans';
import { IUser } from '../entity';

export const sendMessages = async () => {
    cron.schedule('*/40 * * * * *', async () => {
        console.log('Cron start to get messages all users');
        try {
            const users = await userService.getAlluser();
            await (users.map((user:IUser) => {
                emailService
                    .sendEmail(
                        user.email,
                        EmailActionEnum.WELCOME_UTENOK,
                        { user: user.firstName },
                    );
                return null;
            }));
        } catch (e:any) {
            throw new ErrorHandler(e.message, 404);
        }
    });
};
