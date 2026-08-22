// src/server.js

// 1. Importação do framework principal
const express = require('express');

// 2. Instanciação da aplicação
const app = express();

// 3. Definição da porta
const PORT = 3000;

const userRoutes= require('./routes/userRoutes');

// 4. Middleware de parsing de JSON
// Sem isso, o req.body chegaria "undefined" nas requisições POST/PUT
app.use(express.json());

app.use('/users', userRoutes);

// 5. Rota de teste simples (healthcheck)
app.get('/', (req, res) => {
  res.status(200).json({ message: 'API Connect rodando com sucesso.' });
});

// 6. Servidor escutando na porta definida
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});