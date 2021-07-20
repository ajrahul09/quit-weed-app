// Validation
const Joi = require('@hapi/joi');

// Register validation
const registerValidation = data => {
    const schema = Joi.object({
        name: Joi.string().min(6).required(),
        email: Joi.string().min(6).required().email(),
        password: Joi.string().min(6).required()
    });

    // Let's validate the user before we save a user
    return schema.validate(data);
    
}

// Register validation
const loginValidation = data => {
    const schema = Joi.object({
        email: Joi.string().min(6).required().email(),
        password: Joi.string().min(6).required()
    });

    // Let's validate the user before we save a user
    return schema.validate(data);
    
}

// Register profile validation
const newProfileValidation = data => {
    const schema = Joi.object({
        userId: Joi.string(),
        quittingReason: Joi.string(),
        smokingTimesPerDay: Joi.number(),
        hoursStonedPerDay: Joi.number(),
        smokingCostPerWeek: Joi.number(),
        soberDate: Joi.date()
    });

    // Let's validate the user before we save a user
    return schema.validate(data);
    
}

// Register profile validation
const dailyLogValidation = data => {
    const schema = Joi.object({
        userId: Joi.string(),
        cravings: Joi.number(),
        irritability: Joi.number(),
        anxiety: Joi.number(),
        insomnia: Joi.number(),
        appetiteLoss: Joi.number(),
        moodSwings: Joi.number(),
        depression: Joi.number(),
        coldSweats: Joi.number(),
        confidence: Joi.number(),
        happiness: Joi.number(),
        motivation: Joi.number(),
    });

    // Let's validate the user before we save a user
    return schema.validate(data);
    
}

module.exports.registerValidation = registerValidation;
module.exports.loginValidation = loginValidation;
module.exports.newProfileValidation = newProfileValidation;
module.exports.dailyLogValidation = dailyLogValidation;