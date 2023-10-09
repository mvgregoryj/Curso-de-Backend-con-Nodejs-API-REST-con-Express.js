const boom = require('@hapi/boom');

function validatorHandler(schema, property) {
  // Usamos una clausura para retornar un middleware
  return (req, res, next) => {
    const data = req[property];   // puede venir en body, params, o query
    const { error } = schema.validate(data, { abortEarly: false });  // para que envíe todos los errores juntos
    if (error) {
      next(boom.badRequest(error));
    }
    next();
  }
}

module.exports = validatorHandler;