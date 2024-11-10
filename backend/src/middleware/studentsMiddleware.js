const validateBody = (req, res, next) => {
  const { firstname, lastname, dni, email } = req.body;
  const errors = [];

  if (!firstname) errors.push('El nombre es requerido');
  if (!lastname) errors.push('El apellido es requerido');
  if (!dni) errors.push('El DNI es requerido');
  if (!email) errors.push('El email es requerido');

  if (errors.length > 0) {
      return res.status(400).json({ errors });
  }

  next();
};

const validateById = (req, res, next) => {
  const id = Number(req.params.id);
  
  if (isNaN(id) || id <= 0) {
      return res.status(400).json({
          message: 'ID inválido'
      });
  }

  req.params.id = id;
  next();
};

const validateUrlQuery = (req, res, next) => {
  const { currentPage = 1, pageSize = 5, search = '' } = req.query;
  
  const page = Number(currentPage);
  const size = Number(pageSize);

  if (isNaN(page) || page < 1 || isNaN(size) || size < 1) {
      return res.status(400).json({
          message: 'Parámetros de paginación inválidos'
      });
  }

  req.query = {
      currentPage: page,
      pageSize: Math.min(size, 50), // Limitar tamaño máximo de página
      search: search.trim()
  };
  
  next();
};

module.exports = {
  validateBody,
  validateById,
  validateUrlQuery
};