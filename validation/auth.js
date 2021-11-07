import Joi from 'joi';

const registerValidation = (data) => {
    const Schema = Joi.object({
        name: Joi.string().min(6).max(30).required(),
        email: Joi.string().required().email(),
        password: Joi.string().min(6).required(),
        date: Joi.date(),
    });
    return Schema.validate(data);
}

const loginValidation = (data) => {
    const Schema = Joi.object({
        email: Joi.string().required().email(),
        password: Joi.string().min(6).required(),
    });
    return Schema.validate(data);
}

export {registerValidation, loginValidation};