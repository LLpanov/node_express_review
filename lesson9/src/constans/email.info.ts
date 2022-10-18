import { EmailActionEnum } from './enums';

export const emailInfo = {
    [EmailActionEnum.WELCOME_UTENOK]: {
        subject: 'Welcome Utenok',
        html: 'hello on the platform Utenok',
    },
    [EmailActionEnum.DELETE_ACCOUNT]: {
        subject: 'Your account was deleted',
        html: 'goodbye utenok',
    },
    [EmailActionEnum.REGISTER_ON_THE_PLATFORM]: {
        subject: 'Welcome my dear friend',
        html: 'good day all day',
    },
};
