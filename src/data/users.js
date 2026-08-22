// src/data/users.js

// Estrutura de dados em memória (array de objetos)
// Simula uma tabela de usuários, residindo na RAM durante a execução do servidor
let users = [
  { id: 1, name: 'Filipe Vieira', email: 'filipe@example.com', age: 25 },
  { id: 2, name: 'Maria Souza', email: 'maria@example.com', age: 30 }
];

// Controle do próximo ID disponível (estratégia de ID incremental)
// Inicializado com base no maior ID já existente no array
let nextId = users.length > 0
  ? Math.max(...users.map(user => user.id)) + 1
  : 1;

// Função utilitária para gerar o próximo ID único e incrementá-lo
function generateId() {
  const id = nextId;
  nextId += 1;
  return id;
}

module.exports = {
  users,
  generateId
};