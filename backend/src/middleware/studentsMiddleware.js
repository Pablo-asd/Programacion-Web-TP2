const validateBody = (req, res, next) => {
    if (!req.body.firstname) {
        res.status(400).json({
            message: 'name field is required.'
        });
        return;
    }
    next();
  };
  
  const validateById = (req, res, next) => {
    
    if (isNaN(Number(req.params.id))) {
        res.status(400).json(STUDENTS_0002);
        return;
    }
  
    req.params.id = Number(req.params.id);
  
    next();
  };
  
  module.exports = {
    validateBody,
    validateById
  }