import { EmailActionEnum } from './enums';

export const emailInfo = {
    [EmailActionEnum.WELCOME_UTENOK]: {
        subject: 'Welcome Utenok',
        templateName: 'welcome',
    },
    [EmailActionEnum.FORGOT_PASSWORD]: {
        subject: 'dont worry,update your password',
        templateName: 'forgotPassword',
    },
    [EmailActionEnum.REGISTER_ON_THE_PLATFORM]: {
        subject: 'Welcome my dear friend',
        templateName: 'welcome',

    },
};
