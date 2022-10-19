import { getNewUser } from './get-new-users';

export const cronRun = async () => {
    // eslint-disable-next-line no-console
    console.log('CRON WAS STARTED');
    await getNewUser();
};
