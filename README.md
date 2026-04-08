# SOS Universitários — Backend

API REST desenvolvida para a disciplina de Métodos de Projeto de Software (UFPB).
Plataforma colaborativa que conecta alunos a monitores da UFPB.

---

## Como Rodar

### Com banco de dados (PostgreSQL)

1. Instale as dependências:
```bash
npm install
```

2. Configure o `.env`:
```bash
cp .env.example .env
# Defina DB_PASSWORD=8KzpT2VNWE5OJEUS
```

3. Suba o banco via Docker:
```bash
docker compose up -d
```

4. Inicie a aplicação:
```bash
npm run start:dev
```

### Apenas em memória (sem banco)

Defina `STORAGE_TYPE=memory` no `.env` e rode:
```bash
npm run start:dev
```
Os dados são perdidos ao reiniciar. Não requer PostgreSQL.

### Testes

```bash
npm run test
```

---

## Tecnologias

- NestJS · TypeORM · PostgreSQL · TypeScript

---

## Endpoints

| Método | Rota | Descrição |
|--------|------|-----------|
| GET/POST | `/users` | Listar / Criar usuário |
| GET/PUT/DELETE | `/users/:id` | Buscar / Atualizar / Deletar usuário |
| GET/POST | `/monitoria` | Listar / Criar monitoria |
| GET/PUT/DELETE | `/monitoria/:id` | Buscar / Atualizar / Deletar monitoria |
| POST | `/monitoria/:id/undo` | Desfazer última atualização (Memento) |
| GET/POST | `/agendamento` | Listar / Criar agendamento |
| POST | `/agendamento/:id/confirmar` | Confirmar agendamento (State) |
| POST | `/agendamento/:id/cancelar` | Cancelar agendamento (State) |
| POST | `/agendamento/:id/concluir` | Concluir agendamento (State) |
| GET | `/facade/statistics` | Total de usuários e monitorias (Facade) |
| GET | `/facade/users` | Listar usuários via fachada |
| GET | `/facade/monitorias` | Listar monitorias via fachada |
| GET | `/facade/reports/html` | Relatório HTML de estatísticas (Template Method) |
| GET | `/facade/reports/pdf` | Relatório PDF simulado de estatísticas (Template Method) |

---

## Padrões de Projeto Implementados

| Padrão | Onde |
|--------|------|
| **Factory Method** | `UserFactory` — criação de usuários com permissões por tipo |
| **Abstract Factory** | `RepositoryFactory` — seleção da implementação do repositório (TypeORM ou InMemory) |
| **Observer** | `NotificationObserver` — notifica mudanças de status do agendamento |
| **Builder** | `NotificacaoBuilder` — constrói notificações de push/email passo a passo |
| **Strategy** | `IUsersRepository` / `IMonitoriaRepository` — desacopla persistência do domínio |
| **Facade + Singleton** | `FacadeSingletonController` — ponto único de acesso aos serviços |
| **Adapter** | `NestLoggerAdapter` — isola a lib de log do código de negócio |
| **Template Method** | `ReportTemplate` — esqueleto de geração de relatórios HTML e PDF |
| **Command** | `CreateMonitoriaCommand` / `UpdateMonitoriaCommand` — encapsula operações de escrita |
| **Memento** | `MonitoriaMemento` — restaura o estado anterior de uma monitoria |
| **State** | `SolicitadoState`, `ConfirmadoState`, `CanceladoState`, `ConcluidoState` — ciclo de vida do agendamento |
