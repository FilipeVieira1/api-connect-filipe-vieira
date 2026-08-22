// Middleware de validação de entrada para criação/atualização de usuários
function validateUser(req, res, next) {
  const { name, email, age } = req.body;
  const errors = [];

  // Validação do campo "name"
  if (!name || typeof name !== 'string' || name.trim().length === 0) {
    errors.push('O campo "name" é obrigatório e deve ser uma string não vazia.');
  }

  // Validação do campo "email"
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email || typeof email !== 'string' || !emailRegex.test(email)) {
    errors.push('O campo "email" é obrigatório e deve conter um formato válido.');
  }

  // Validação opcional do campo "age" (se fornecido, precisa ser número positivo)
  if (age !== undefined && (typeof age !== 'number' || age < 0)) {
    errors.push('O campo "age", quando informado, deve ser um número positivo.');
  }

  // Interrompe o fluxo caso alguma regra tenha sido violada
  if (errors.length > 0) {
    return res.status(400).json({ error: errors.join(' ') });
  }

  // Nenhuma anomalia detectada: segue para o controller
  next();
}

module.exports = validateUser;