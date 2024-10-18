const joi = require("joi");


module.exports.joiSchema= joi.object({
    
    listing:joi.object({
        title: joi.string().required().max(20),
        description: joi.string().required(),
        price: joi.number().required().min(1),
        location: joi.string().required(),
        country: joi.string().required(),
        image: joi.string().allow("",null)
    }).required(),
  

})