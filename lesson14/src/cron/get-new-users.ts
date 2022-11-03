import cron from 'node-cron';
import { userRepository } from '../repositories/user/userRepository';

export const getNewUser = async () => {
    cron.schedule('*/10 * * * * *', async () => {
        // eslint-disable-next-line no-console
        console.log('Work start get with new users');
        const newUsers = await userRepository.getNewUsers();
        // eslint-disable-next-line no-console
        console.log(newUsers);
    });
};
