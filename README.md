# Trabalho MPS - Sistema de Gerenciamento de Usuários

Trabalho desenvolvido para a disciplina de Métodos de Projeto de Software do curso de Ciência da Computação da Universidade Federal da Paraíba (UFPB).

## Tecnologias Utilizadas

- Node.js
- NestJS
- TypeORM
- PostgreSQL
- TypeScript

## Estrutura do Projeto

O projeto consiste em uma API REST para gerenciamento de usuários com as seguintes funcionalidades:

- Criar usuário
- Listar todos os usuários
- Buscar usuário por ID
- Atualizar usuário
- Deletar usuário

## Configuração

1. Instalar dependências:
```bash
npm install
```

2. Configurar variáveis de ambiente no arquivo `.env`:
 
3. Iniciar o servidor PostgreSQL

4. Executar o projeto:
```bash
npm run start:dev
```

## Endpoints da API

- `GET /users` - Lista todos os usuários
- `GET /users/:id` - Busca um usuário por ID
- `POST /users` - Cria um novo usuário
- `PUT /users/:id` - Atualiza um usuário
- `DELETE /users/:id` - Deleta um usuário

