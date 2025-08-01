<p align="center">
  <img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" />
</p>

# 📅 API de Agendamentos Fagammon

Uma API robusta para sistema de agendamentos desenvolvida com NestJS, TypeORM e PostgreSQL. O sistema permite gerenciar usuários, locais e agendamentos com autenticação JWT e documentação Swagger.

## 🚀 Tecnologias

- **[NestJS](https://nestjs.com/)** - Framework Node.js progressivo
- **[TypeORM](https://typeorm.io/)** - ORM para TypeScript e JavaScript
- **[PostgreSQL](https://www.postgresql.org/)** - Banco de dados relacional
- **[JWT](https://jwt.io/)** - Autenticação e autorização
- **[Swagger](https://swagger.io/)** - Documentação da API
- **[Bcrypt](https://www.npmjs.com/package/bcrypt)** - Hash de senhas
- **[Multer](https://www.npmjs.com/package/multer)** - Upload de arquivos

## 📋 Funcionalidades

### 🔐 Autenticação
- Login com email e senha
- Autenticação JWT
- Recuperação de senha
- Redefinição de senha

### 👥 Gestão de Usuários
- Cadastro de usuários (Admin/Comum)
- Listagem e busca de usuários
- Atualização de perfil
- Sistema de permissões baseado em roles
- Upload de foto de perfil

### 🏢 Gestão de Locais
- Cadastro de ambientes/locais
- Upload de fotos dos locais
- Configuração de horários disponíveis
- Listagem e busca de locais

### 📅 Sistema de Agendamentos
- Criação de agendamentos
- Visualização de agendamentos públicos
- Cancelamento de agendamentos
- Sistema de inscrições
- Bloqueios globais de horários
- Filtros e paginação

## 🛠️ Instalação

### Pré-requisitos
- Node.js (versão 18 ou superior)
- PostgreSQL
- npm ou yarn

### Configuração

1. **Clone o repositório**
```bash
git clone <url-do-repositorio>
cd apifagammon
```

2. **Instale as dependências**
```bash
npm install
```

3. **Configure as variáveis de ambiente**
```bash
cp .env.example .env
```

Configure as seguintes variáveis no arquivo `.env`:
```env
# Database
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=seu_usuario
DB_PASSWORD=sua_senha
DB_DATABASE=fagammon_db

# JWT
JWT_SECRET=seu_jwt_secret_muito_seguro

# Email (para recuperação de senha)
MAIL_HOST=smtp.gmail.com
MAIL_PORT=587
MAIL_USER=seu_email@gmail.com
MAIL_PASS=sua_senha_app
```

4. **Execute as migrações**
```bash
npm run migration:run
```

## 🚀 Execução

### Desenvolvimento
```bash
npm run start:dev
```

### Produção
```bash
npm run build
npm run start:prod
```

A API estará disponível em `http://localhost:3000`