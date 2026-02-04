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

### 1. Instalar dependências:
```bash
npm install
```

### 2. Configurar Supabase

#### Passo 1: Criar conta e projeto no Supabase
1. Acesse [https://supabase.com](https://supabase.com)
2. Crie uma conta (gratuita)
3. Clique em "New Project"
4. Preencha:
   - **Name**: nome do seu projeto
   - **Database Password**: crie uma senha forte (anote ela!)
   - **Region**: escolha a região mais próxima
5. Aguarde alguns minutos enquanto o projeto é criado

#### Passo 2: Obter credenciais de conexão
1. No dashboard do Supabase, vá em **Settings** → **Database**
2. Role até a seção **Connection string** → **URI**
3. Você verá algo como:
   ```
   postgresql://postgres.xxxxxxxxxxxxx:[YOUR-PASSWORD]@db.xxxxxxxxxxxxx.supabase.co:5432/postgres
   ```
4. Ou use as informações individuais:
   - **Host**: `db.xxxxxxxxxxxxx.supabase.co`
   - **Port**: `5432`
   - **Database**: `postgres`
   - **User**: `postgres.xxxxxxxxxxxxx`
   - **Password**: a senha que você criou

#### Passo 3: Configurar variáveis de ambiente
1. Copie o arquivo `env.example` para `.env`:
   ```bash
   cp env.example .env
   ```
2. Edite o arquivo `.env` com suas credenciais do Supabase:
   ```env
   DB_HOST=db.xxxxxxxxxxxxx.supabase.co
   DB_PORT=5432
   DB_USERNAME=postgres.xxxxxxxxxxxxx
   DB_PASSWORD=sua_senha_do_supabase
   DB_DATABASE=postgres
   DB_SSL=true
   PORT=3000
   NODE_ENV=development
   ```

### 3. Executar o projeto:
```bash
npm run start:dev
```

A aplicação estará rodando em `http://localhost:3000`


## Endpoints da API

- `GET /users` - Lista todos os usuários
- `GET /users/:id` - Busca um usuário por ID
- `POST /users` - Cria um novo usuário
- `PUT /users/:id` - Atualiza um usuário
- `DELETE /users/:id` - Deleta um usuário

