export const validate = (schema) => (req, res, next) => {
    const { error } = schema.validate(req.body || req.params || req.query, { abortEarly: false });
    if (error) {
      return res.status(400).json({ errors: error.details.map((err) => err.message) });
    }
    next();
  };
  