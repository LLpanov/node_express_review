import Joi from 'joi';
import { constants, regexp } from '../../constans';

export const commonValidator = {
    emailValidator: Joi.string().regex(constants.EMAIL_REGEXP),
    phoneValidator: Joi.string().regex(regexp.PHONE),
    passwordValidator: Joi.string().regex(regexp.PASSWORD),
};
