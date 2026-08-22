const { users, generateId } = require('../data/users');

// GET /users - lista todos os usuários
function getAllUsers(req, res) {
  res.status(200).json(users);
}

// POST /users - cadastra um novo usuário
function createUser(req, res) {
  const { name, email, age } = req.body;

  // Validação básica de entrada
  if (!name || !email) {
    return res.status(400).json({ error: 'Os campos "name" e "email" são obrigatórios.' });
  }

  const newUser = {
    id: generateId(),
    name,
    email,
    age: age || null
  };

  users.push(newUser);

  res.status(201).json(newUser);
}

// GET /users/:id - busca um usuário específico pelo ID
function getUserById(req, res) {
  // Parâmetros de rota chegam sempre como string, por isso o Number() é necessário
  const id = Number(req.params.id);

  const user = users.find(u => u.id === id);

  // Cenário de resiliência: ID não encontrado na estrutura em memória
  if (!user) {
    return res.status(404).json({ error: 'Usuário não encontrado.' });
  }

  res.status(200).json(user);
}

// PUT /users/:id - atualiza um usuário existente
function updateUser(req, res) {
  const id = Number(req.params.id);

  // Localiza o ÍNDICE do usuário no array (não o objeto diretamente),
  // pois precisamos da posição para sobrescrever os dados corretamente
  const index = users.findIndex(u => u.id === id);

  // Tratamento de resiliência: ID não encontrado
  if (index === -1) {
    return res.status(404).json({ error: 'Usuário não encontrado.' });
  }

  const { name, email, age } = req.body;

  // Validação básica dos campos obrigatórios
  if (!name || !email) {
    return res.status(400).json({ error: 'Os campos "name" e "email" são obrigatórios.' });
  }

  // Subscreve os campos do registro existente, preservando o ID original
  users[index] = {
    id: users[index].id,
    name,
    email,
    age: age || null
  };

  res.status(200).json(users[index]);
}

// DELETE /users/:id - remove um usuário existente
function deleteUser(req, res) {
  const id = Number(req.params.id);

  const index = users.findIndex(u => u.id === id);

  // Tratamento de resiliência: ID não encontrado
  if (index === -1) {
    return res.status(404).json({ error: 'Usuário não encontrado.' });
  }

  // Remove o elemento da estrutura em memória, na posição localizada
  users.splice(index, 1);

  // 204 No Content - sucesso, porém sem corpo de resposta
  res.status(204).send();
}

// POST /users - cadastra um novo usuário
function createUser(req, res) {
  const { name, email, age } = req.body;

  // A validação de formato já ocorreu no middleware (validateUser)
  // Aqui tratamos apenas uma regra de negócio específica deste controller:
  // impedir e-mails duplicados na base
  const emailExists = users.some(u => u.email === email);
  if (emailExists) {
    return res.status(409).json({ error: 'Este e-mail já está cadastrado.' });
  }

  const newUser = {
    id: generateId(),
    name: name.trim(),
    email,
    age: age || null
  };

  users.push(newUser);

  // Resposta de sucesso padronizada com o envelope "data"
  res.status(201).json({ data: newUser });
}

module.exports = {
  getAllUsers,
  createUser,
  getUserById,
  updateUser,
  deleteUser
};