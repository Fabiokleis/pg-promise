const Joi = require('joi');

// validation layer to user

const expValidation = (value, helpers) => {
    const now = new Date();
    const exp = new Date(value * 1000);
    if (exp.getHours >= now.getHours && exp.getDate() == now.getDate()) {
        return value;
    } else {
        return helpers.message('token expired, login again!');
    }
}

const UserValidator = {
     userId: (params) => {
        const UserSchema = Joi.object().keys({
            id: Joi.number()
                .min(1)
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
    },

    loginUser: (body) => {
        const UserSchema = Joi.object({ 
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
    },

    jwtUserDecoded: (body) => {
        const UserSchema = Joi.object({
            id: Joi.number()
                .min(1)
                .required(),

            email: Joi.string()
                .email()
                .min(5)
                .max(80)
                .required(),

            name: Joi.string()
                .pattern(/^[a-zA-Z][A-Za-z_0-9]{2,30}$/)
                .required(),

            iat: Joi.number()
                .required(),

            exp: Joi.number()
                .required().custom(expValidation, 'jwt expiration validatite')
    })
        return UserSchema.validateAsync(body);
   },

    UserName: (query) => {
        const UserSchema = Joi.object().keys({
            name: Joi.string()
                .pattern(/^[a-zA-Z][A-Za-z_0-9]{2,30}$/)
                .required()
        })
        return UserSchema.validateAsync(query);
    }

 
}

module.exports = UserValidator;
