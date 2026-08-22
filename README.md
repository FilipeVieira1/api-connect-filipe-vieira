# API Connect

API REST para gerenciamento de usuários, desenvolvida como MVP (Produto Mínimo Viável) para validação de uma nova ideia de negócio de uma startup de tecnologia.

## 🎯 Objetivo

Fornecer uma base de dados via API RESTful, permitindo que o time de front-end liste, cadastre, atualize e remova usuários de forma padronizada, seguindo os princípios de comunicação HTTP e boas práticas de arquitetura back-end.

## 🛠️ Tecnologias utilizadas

- **Node.js** — ambiente de execução JavaScript server-side
- **Express** — microframework para criação de rotas e middlewares
- **Nodemon** — reinício automático do servidor em desenvolvimento
- **Dotenv** — gerenciamento de variáveis de ambiente
- **Cors** — habilitação de requisições de outras origens (front-end)
- **Morgan** — logging de requisições HTTP no console

> Persistência de dados simulada em memória (array JavaScript), sem uso de banco de dados real nesta versão do MVP.

## 📁 Estrutura do projeto

api-connect/
├── src/
│ ├── server.js # Ponto de entrada da aplicação
│ ├── routes/
│ │ └── userRoutes.js # Definição dos endpoints HTTP
│ ├── controllers/
│ │ └── userController.js # Lógica de negócio das requisições
│ ├── middlewares/
│ │ └── validateUser.js # Validação de entrada (POST/PUT)
│ └── data/
│ └── users.js # Persistência em memória + geração de IDs
├── .env # Variáveis de ambiente (não versionado)
├── .gitignore
├── package.json
└── README.md

## 🚀 Como executar localmente

### Pré-requisitos
- Node.js instalado (versão LTS recomendada)

### Passo a passo

1. Clone o repositório:
```bash
git clone https://github.com/FilipeVieira1/api-connect-filipe-vieira.git
cd api-connect-filipe-vieira
```

2. Instale as dependências:
```bash
npm install
```

3. Crie o arquivo `.env` na raiz do projeto:

PORT=3000


4. Inicie o servidor em modo de desenvolvimento:
```bash
npm run dev
```

5. O servidor estará disponível em:

http://localhost:3000


## 📋 Endpoints disponíveis

Todas as respostas seguem o envelope padronizado `{ "data": ... }` para sucesso ou `{ "error": "..." }` para falhas.

| Método | Rota           | Descrição                          | Status de sucesso | Status de erro |
|--------|----------------|-------------------------------------|--------------------|-----------------|
| GET    | `/users`       | Lista todos os usuários             | 200 OK             | —               |
| GET    | `/users/:id`   | Busca um usuário pelo ID            | 200 OK             | 404 Not Found   |
| POST   | `/users`       | Cadastra um novo usuário            | 201 Created        | 400 Bad Request |
| PUT    | `/users/:id`   | Atualiza um usuário existente       | 200 OK             | 400 / 404       |
| DELETE | `/users/:id`   | Remove um usuário existente         | 204 No Content     | 404 Not Found   |

### Exemplo de requisição — Criar usuário (POST `/users`)

**Corpo da requisição:**
```json
{
  "name": "Ana Souza",
  "email": "ana@example.com",
  "age": 22
}
```

**Resposta de sucesso (201):**
```json
{
  "data": {
    "id": 3,
    "name": "Ana Souza",
    "email": "ana@example.com",
    "age": 22
  }
}
```

**Resposta de erro — campo ausente (400):**
```json
{
  "error": "O campo \"email\" é obrigatório e deve conter um formato válido."
}
```

### Exemplo de requisição — Buscar usuário inexistente (GET `/users/999`)

**Resposta (404):**
```json
{
  "error": "Usuário não encontrado."
}
```

## 👤 Autor

Filipe Vieira
[LinkedIn](https://linkedin.com/in/filipe-vieira-bb393a268) • [GitHub](https://github.com/FilipeVieira1)