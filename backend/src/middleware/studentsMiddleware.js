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

const validatePaginationParams = (req, res, next) => {
    try {
        const { currentPage = 1, pageSize = 5, search = '' } = req.query;

        // Validar que sean números
        if (isNaN(currentPage) || isNaN(pageSize)) {
            return res.status(400).json({
                success: false,
                message: 'Los parámetros de paginación deben ser números'
            });
        }

        // Validar rangos
        if (currentPage < 1 || pageSize < 1) {
            return res.status(400).json({
                success: false,
                message: 'Los parámetros de paginación deben ser mayores a 0'
            });
        }

        // Validar tamaño máximo de página
        if (pageSize > 50) {
            return res.status(400).json({
                success: false,
                message: 'El tamaño de página no puede ser mayor a 50'
            });
        }

        // Sanitizar búsqueda
        req.query.search = search.trim();
        req.query.currentPage = parseInt(currentPage);
        req.query.pageSize = parseInt(pageSize);

        next();
    } catch (error) {
        next(error);
    }
};

module.exports = {
  validateBody,
  validateById,
  validatePaginationParams
};