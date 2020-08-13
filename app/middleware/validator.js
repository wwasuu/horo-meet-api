const Joi = require("joi");
const middleware = (schema, property) => {
  return (req, res, next) => {
    const { error } = Joi.validate(req.body, schema);
    const valid = error == null;

    if (valid) {
      next();
    } else {
      const { details } = error;
      const message = details.map(i => i.message).join(",");
      res.status(422).json({ statusCode: 422, message, url: req.originalUrl });
    }
  };
};
module.exports = middleware;
