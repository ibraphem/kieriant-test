import Joi from "joi";

export const validateSignIn = (req, res, next) => {
  const schema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  });

  const { error } = schema.validate(req.body);

  if (error) {
    return res
    .status(400)
    .send({ status: false, message: "Validation error", data: error.details });
  }

  next();
}


export const validateMoveFund = (req, res, next) => {
    const schema = Joi.object({
      pin: Joi.string().required(),
      walletAddress: Joi.string().required(),
      amount: Joi.number().integer().required(),
    });
  
    const { error } = schema.validate(req.body);
  
    if (error) {
      return res
        .status(400)
        .send({ status: false, message: "Validation error", data: error.details });
    }
  
    next();
  }

  export const validateCompleteTransaction = (req, res, next) => {
    const schema = Joi.object({
        transactionId: Joi.string().required(),
      otp: Joi.number().integer().required(),
    });
  
    const { error } = schema.validate(req.body);
  
    if (error) {
      return res
        .status(400)
        .send({ status: false, message: "Validation error", data: error.details });
    }
  
    next();
  }
