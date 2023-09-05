import joi from 'joi';

export const createValidatorMiddleware = (validator, target = 'query') => {
  return async (req, res, next) => {
    try {
      await validator.validateAsync(req[target]);

      next();
    } catch (error) {
      let treatedError = new Error(
        'Erro desconhecido no middleware de validação',
      );
      console.log(joi.ValidationError);
      if (error instanceof joi.ValidationError) {
        console.log(error);
        treatedError = res
          .status(400)
          .send({ status: 'error', message: error.message });
      } else {
        treatedError = error;
      }
      next(treatedError);
    }
  };
};
export default createValidatorMiddleware;
