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

2. Configurar variáveis de ambiente:
   - Copie o arquivo `.env.example` para `.env`:
   ```bash
   cp .env.example .env
   ```
   - O arquivo `.env` já contém as configurações padrão para o Docker

3. Iniciar o banco de dados PostgreSQL via Docker Compose:
```bash
docker compose up -d
```

4. Verificar se o container está rodando:
```bash
docker compose ps
```

5. Executar o projeto:
```bash
npm run start:dev
```

## Comandos Docker Úteis

- Ver logs do PostgreSQL:
```bash
docker compose logs -f postgres-dev
```

- Parar o banco de dados:
```bash
docker compose down
```

- Parar e remover volumes (limpar dados):
```bash
docker compose down -v
```

## Endpoints da API

- `GET /users` - Lista todos os usuários
- `GET /users/:id` - Busca um usuário por ID
- `POST /users` - Cria um novo usuário
- `PUT /users/:id` - Atualiza um usuário
- `DELETE /users/:id` - Deleta um usuário

