const validateName = (req, res, next) => {
  const { name } = req.body;
   
  if (!name) {
    return res.status(400).json({ message: '"name" is required' });
  }
  const nameLengthValidation = name.length >= 5;
  if (!nameLengthValidation) {
    return res.status(422).json({ message: '"name" length must be at least 5 characters long' });
  }

  return next();
};

module.exports = validateName;