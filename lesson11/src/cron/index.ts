import {sendMessages} from './send-messages';

export const cronRun = async () => {
    // eslint-disable-next-line no-console
    console.log('CRON WAS STARTED');
    // await getNewUser();
    await sendMessages();
};
