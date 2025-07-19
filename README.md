# AuthFlow

Uma aplicação web moderna, projetada para fornecer um fluxo de autenticação de usuário completo e seguro. Este projeto serve como um modelo robusto para a construção de aplicativos que exigem funcionalidades como cadastro, login e recuperação de senha.

## Funcionalidades Principais

- **Cadastro de Usuário:** Um processo de cadastro em duas etapas que valida informações pessoais e a criação de uma senha segura.
- **Login Seguro:** Permite que os usuários façam login com e-mail e senha, verificando as credenciais e gerando um token JWT para a sessão.
- **Recuperação de Senha:** Funcionalidade de "esqueci a senha" que envia um link único e seguro para o e-mail do usuário, permitindo que ele redefina sua senha.
- **Rotas de Proteção:** O `middleware` protege as rotas privadas, garantindo que apenas usuários autenticados possam acessá-las.

## Tecnologias Utilizadas

O projeto foi desenvolvido com um conjunto de tecnologias modernas e eficientes, garantindo desempenho e escalabilidade:

### Frontend

- **Next.js:** Framework React para construção de aplicações web full-stack.
- **TypeScript:** Linguagem de programação que adiciona tipagem estática ao JavaScript.
- **Tailwind CSS:** Framework CSS utilitário para estilização rápida.
- **React Hook Form & Zod:** Bibliotecas para gerenciamento de formulários e validação de dados.
- **Axios:** Cliente HTTP para comunicação com a API.
- **Framer Motion:** Biblioteca para animações.

### Backend e Banco de Dados

- **Next.js API Routes:** Construção de endpoints de API para o backend.
- **Prisma:** ORM para interação com o banco de dados.
- **bcryptjs:** Usado para criptografar senhas, garantindo a segurança das credenciais dos usuários.
- **jsonwebtoken (JWT):** Para autenticação baseada em token, permitindo sessões seguras.
- **Nodemailer:** Utilizado para envio de e-mails de recuperação de senha.
- **PostgreSQL:** Banco de dados relacional (configurado via Docker).

## Como Iniciar

1. **Clone o repositório:**
    
    `git clone https://github.com/MelquiMartins42/auth-flow
    cd seu-projeto`
    
2. **Configure o banco de dados:**
Certifique-se de ter o Docker instalado e execute o seguinte comando para iniciar o contêiner do PostgreSQL:Bash
    
    `docker-compose up -d`
    
3. **Instale as dependências:**
    
    `npm install`
    
4. **Configure as variáveis de ambiente:**
Crie um arquivo `.env` na raiz do projeto com base no arquivo `.env.example`.
5. **Execute as migrações do Prisma:**
    
    `npx prisma migrate dev`
    
6. **Inicie o servidor de desenvolvimento:**
    
    `npm run dev`
    
    O projeto estará disponível em `http://localhost:3000`.
    

## Estrutura do Projeto

O projeto segue a estrutura de diretórios do Next.js App Router, com as rotas de API e páginas da aplicação bem organizadas. Os componentes reutilizáveis para formulários e alertas são centralizados, facilitando a manutenção e a reutilização de código.