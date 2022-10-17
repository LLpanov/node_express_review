import { emailActionEnum } from './enums';

export const emailInfo = {
    [emailActionEnum.WELCOME_UTENOK]: {
        subject: 'Welcome Utenok',
        html: 'hello on the platform Utenok',
    },
    [emailActionEnum.DELETE_ACCOUNT]: {
        subject: 'Your account was deleted',
        html: 'goodbye utenok',
    },
    [emailActionEnum.REGISTER_ON_THE_PLATFORM]: {
        subject: 'Welcome my dear friend',
        html: 'good day all day',
    },
};
