import * as Joi from 'joi';
import { commonValidator } from './common/commonValidator';

export const authValidator = {
    login: Joi.object({
        email: commonValidator.emailValidator.message('email not valid').trim(),
        password: Joi.string()
            .required()
            .min(8).message('password not valid')
            .trim(),
    }),
    registration: Joi.object({
        firstName: Joi.string().required().min(3).max(12),
        lastName: Joi.string().required().min(3).max(12),
        age: Joi.number().required().min(18).max(99),
        email: commonValidator.emailValidator.message('email not valid').trim(),
        password: commonValidator.passwordValidator.message('password not valid').trim(),
        phone: commonValidator.phoneValidator.message('phone not valid').trim(),

    }),
};
