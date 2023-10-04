const joi = require("joi");

const contactSchema = joi.object({
    name: joi.string().min(3).required(),
    email: joi.string().email().required(),
    phone: joi.string()
      .min(8)
      .required(),
  });

const contactValidator = (body) => contactSchema.validate(body);

module.exports = { contactValidator };