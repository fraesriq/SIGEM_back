const { failure } = require('../utils/response');

function validate(schema) {
  return (req, res, next) => {
    const result = schema.safeParse({
      body: req.body,
      params: req.params,
      query: req.query
    });

    if (!result.success) {
      return failure(res, 'Los datos enviados no son válidos', 422);
    }

    req.validated = result.data;
    return next();
  };
}

module.exports = validate;
