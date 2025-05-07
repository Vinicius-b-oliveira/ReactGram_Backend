# ReactGram - Backend

Esse é o backend do ReactGram, uma aplicação fullstack inspirada no Instagram, com funcionalidades como cadastro de usuários, autenticação, postagem de fotos, curtidas, comentários e muito mais. Este repositório contém a API que será consumida pelo frontend em React.

### Importante:

- Atualmente a rota para a documentação com Swagger só funciona localmente!!
- Devido a hospedagem gratuita, a resposta pode ser um pouco lenta

## Principais Funcionalidades

### Usuários

- **Registro de usuários**: Crie uma conta fornecendo nome, e-mail, senha e confirmação de senha.
- **Autenticação**: Faça login com e-mail e senha para receber um token JWT.
- **Perfil do usuário**: Acesse e atualize seu perfil, incluindo nome, senha, biografia e imagem de perfil.
- **Busca de usuários**: Encontre outros usuários pelo ID.

### Fotos

- **Postagem de fotos**: Envie fotos com um título.
- **Curtidas**: Curta ou remova sua curtida de uma foto.
- **Comentários**: Adicione comentários às fotos.
- **Busca de fotos**: Encontre fotos por título.
- **Listagem de fotos**: Veja todas as fotos ou apenas as fotos de um usuário específico.

## Tecnologias Utilizadas

- **Node.js**: Ambiente de execução JavaScript.
- **Express**: Framework para construção da API.
- **MongoDB**: Banco de dados NoSQL para armazenamento de dados.
- **Mongoose**: Modelagem de dados do MongoDB.
- **JWT (JSON Web Tokens)**: Autenticação e gerenciamento de sessões.
- **Cloudinary**: Armazenamento de imagens na nuvem.
- **Multer**: Manipulação de upload de arquivos (usado com Cloudinary).
- **Swagger**: Documentação da API.
- **Bcrypt**: Criptografia de senhas.
- **CORS**: Middleware para permitir requisições entre origens diferentes.
- **Render**: Plataforma de hospedagem para o backend.

## Como Rodar o Projeto Localmente

### Pré-requisitos

- Node.js (v18 ou superior)
- MongoDB (local ou Atlas)
- Git (opcional)
- Conta no [Cloudinary](https://cloudinary.com/)

### Passos

1. **Clone o repositório**:

    ```bash
    git clone https://github.com/Vinicius-b-oliveira/ReactGram_Backend.git
    cd reactgram-backend
    ```

2. **Instale as dependências**:

    ```bash
    npm install
    ```

3. **Configure as variáveis de ambiente**:
   Crie um arquivo `.env` na raiz do projeto e adicione as seguintes variáveis:

    ```env
    PORT=5000
    LOCAL_CORS_ORIGIN=http://localhost:5173
    PROD_CORS_ORIGIN=https://seu-frontend-hospedado.com
    DB_USER=seu_usuario_mongodb
    DB_PASS=sua_senha_mongodb
    JWT_SECRET=sua_chave_secreta_jwt
    CLOUDINARY_CLOUD_NAME=seu_nome_no_cloudinary
    CLOUDINARY_API_KEY=sua_api_key
    CLOUDINARY_API_SECRET=sua_api_secret
    ```

4. **Inicie o servidor**:
    ```bash
    npm run server
    ```

O servidor estará rodando em `http://localhost:5000`.

### Documentação da API

Acesse `http://localhost:5000/api-docs` para visualizar a documentação completa da API via Swagger UI.

#### Exemplo:

![Rotas da API no Swagger](./assets/swagger-routes.png)

## Estrutura do Projeto

```
reactgram-backend/
├── src/
│   ├── config/          # Configurações do banco de dados e cloudinary
│   ├── controllers/     # Lógica das rotas
│   ├── middlewares/     # Autenticação, validações e CORS
│   ├── models/          # Modelos do MongoDB
│   ├── routes/          # Definição das rotas
│   ├── utils/           # Funções auxiliares
│   ├── app.js           # Ponto de entrada da aplicação
│   └── swagger.json     # Documentação da API
├── .env.example         # Exemplo de variáveis de ambiente
└──  assets/
```

## Hospedagem

O backend está atualmente hospedado na plataforma [Render](https://render.com/), facilitando o deploy contínuo e escalável da aplicação.

## Variáveis de Ambiente

| Variável              | Descrição                                            |
| --------------------- | ---------------------------------------------------- |
| PORT                  | Porta onde o servidor será executado                 |
| LOCAL_CORS_ORIGIN     | Origem permitida em ambiente local                   |
| PROD_CORS_ORIGIN      | Origem permitida em produção                         |
| DB_USER               | Usuário do banco de dados MongoDB                    |
| DB_PASS               | Senha do banco de dados MongoDB                      |
| JWT_SECRET            | Chave secreta para geração e validação de tokens JWT |
| CLOUDINARY_CLOUD_NAME | Nome da conta Cloudinary                             |
| CLOUDINARY_API_KEY    | Chave da API do Cloudinary                           |
| CLOUDINARY_API_SECRET | Segredo da API do Cloudinary                         |
