const Joi = require("joi");
function validatee(req, res, next) {
  const schema = Joi.object({
    title: Joi.string().min(5).max(255).required(),
    image: Joi.string().min(5).max(255).required(),
  });

  const { error } = schema.validate(req.body);
  return error ? res.status(400).send("Data invalide ....") : next();
}

module.exports = validatee;
