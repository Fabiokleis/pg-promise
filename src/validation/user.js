const Joi = require('joi');

// validation layer to user

const UserValidator = {
     userId: (params) => {
        const UserSchema = Joi.object().keys({
            id: Joi.number()
                .min(1)
                .max(1000)
                .required()
        });

        return UserSchema.validateAsync(params);
    },

    createUser: (body) => {
        const UserSchema = Joi.object({
            name: Joi.string()
                .pattern(/^[a-zA-Z][A-Za-z_0-9]{2,30}$/)
                .required(),
    
            email: Joi.string()
                .email()
                .min(5)
                .max(80)
                .required(),
    
            password: Joi.string()
                .min(8)
                .max(80)
                .required()
         });
    
        return UserSchema.validateAsync(body);
    }
}

module.exports = UserValidator;
