import { EmailActionEnum } from './enums';

export const emailInfo = {
    [EmailActionEnum.WELCOME_UTENOK]: {
        subject: 'Welcome Utenok',
        templateName: 'welcome',
    },
    [EmailActionEnum.DELETE_ACCOUNT]: {
        subject: 'Your account was deleted',
        templateName: 'welcome',
    },
    [EmailActionEnum.REGISTER_ON_THE_PLATFORM]: {
        subject: 'Welcome my dear friend',
        templateName: 'welcome',

    },
};
