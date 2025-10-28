import Joi from 'joi';

export const validateRegister = (req, res, next) => {
  const schema = Joi.object({
    name: Joi.string().min(2).max(100).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
    location: Joi.string().max(100),
    soil_type: Joi.string().max(50),
    farm_size: Joi.number().min(0)
  });

  const { error } = schema.validate(req.body);
  if (error) {
    return res.status(400).json({
      status: 'error',
      message: error.details[0].message
    });
  }
  next();
};

export const validateLogin = (req, res, next) => {
  const schema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required()
  });

  const { error } = schema.validate(req.body);
  if (error) {
    return res.status(400).json({
      status: 'error',
      message: error.details[0].message
    });
  }
  next();
};

export const validateCropPrediction = (req, res, next) => {
  const schema = Joi.object({
    location: Joi.string().required(),
    soil_type: Joi.string().required(),
    farm_size: Joi.number().min(0).required(),
    season: Joi.string().valid('rainy', 'dry', 'spring', 'summer', 'autumn', 'winter').required()
  });

  const { error } = schema.validate(req.body);
  if (error) {
    return res.status(400).json({
      status: 'error',
      message: error.details[0].message
    });
  }
  next();
};