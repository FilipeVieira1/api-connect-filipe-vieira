const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const validateUser = require('../middlewares/validateUser');

// GET /users - retorna todos os usuários
router.get('/', userController.getAllUsers);
router.get('/:id', userController.getUserById);

// POST /users - cria um novo usuário
router.post('/', userController.createUser);

router.put('/:id', userController.updateUser);      // PUT
router.delete('/:id', userController.deleteUser);   // DELETE

// O middleware validateUser roda ANTES do controller,
// interceptando requisições malformadas antes que cheguem na lógica de negócio
router.post('/', validateUser, userController.createUser);

module.exports = router;