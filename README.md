<h1 align="center">
  API Mini-Insta
</h1>

<p align="center">
  <a href="#principais-funcionalidades">Principais Funcionalidades</a> •
  <a href="#conceitos">Conceitos</a> •
  <a href="#tecnologias">Tecnologias</a> •
  <a href="#instalacao">Instalação</a> •
  <a href="#endpoints">Endpoints</a> •
</p>

---

## 🚀 Principais Funcionalidades

<br>

-  Fazer login
-  Fazer cadastro
-  Ver dados do seu perfil
-  Ver postagem de outras pessoas
   -  Ver quantidade de curtidas em uma postagem
   -  Ver os comentários de uma postagem
-  Curtir postagens
-  Comentar em postagens
-  Upload de fotos
-  Excluir fotos

---

## 📕 Conceitos

<br>

-  API REST
-  Integração com banco de dados PostegreSQL
-  Criptografar senhas
-  Autenticação de usuários
-  Variáveis de Ambiente
-  Codificação de dados
-  Upload de arquivos para servidor

---

## 🌐 Tecnologias

<br>

-  Javascript
-  Node.js

<br>

---

## 🖥️ Instalação

<br>

### 1. Clone este repositório

```
git clone https://github.com/mahbuq/cubos-academy-mini-insta.git
```

<br>

### 2. Instale as dependências

```
npm install
```

or

```
yarn
```

<br>

### 3. Crie arquivo .env a partir do arquivo .env.exemplo, inserindo os valores das variáveis de ambiente

<br>

---

## 🔎 Endpoints

<br>

### POST - Cadastro de usuário

### Dados enviados

-  username
-  senha

### Dados retornados

-  sucesso/erro

### Objetivos gerais

-  validar username e senha
-  verificar se já existe algum usuário com esse username
-  criptografar senha
-  cadastrar usuário no banco de dados
-  retornar sucesso ou erro

<br>

### POST - Login

### Dados enviados

-  username
-  senha

### Dados retornados

-  sucesso / erro

### Objetivos gerais

-  validar username e senha
-  buscar usuário no banco de dados
-  verificar se a senha informada está correta
-  gerar token de autenticação
-  retornar os dados do usuário e o token

<br>

### GET - Exibir perfil

### Dados enviados

-  token (informado no header da requisição)

### Dados retornados

-  URL da foto de perfil
-  nome
-  username
-  site
-  bio
-  email
-  telefone
-  genero

### Objetivos gerais

-  validar token
-  buscar informações do usuário a partir do token
-  retornar os dados do usuário

<br>

### PUT - Atualizar perfil

### Dados enviados

-  token (informado no header da requisição)
-  URL da foto de perfil
-  nome
-  username
-  site
-  bio
-  telefone
-  genero

### Dados retornados

-  sucesso/erro

### Objetivos gerais

-  validar token
-  buscar informações do usuário a partir do token
-  exigir pelo menos um campo para atualizar
-  criptograr a nova senha, se for informada
-  verificar se já existe uma outra conta com o mesmo username ou email, se forem informados
-  atualizar o registro do usuário
-  retornar sucesso ou erro

<br>

### GET - Postagens (Feed)

### Dados enviados

-  token (informado no header da requisição)
-  offset

### Dados retornados

-  postagens []
   -  id
   -  usuario
      -  URL a foto
      -  username
      -  verificação do perfil
   -  fotos []
   -  quantidade de curtidas
   -  comentários []
      -  username
      -  texto
   -  data

### Objetivos gerais

-  validar token
-  exibir postagens de outras pessoas

<br>

### POST - Criar Postagem

### Dados enviados

-  token (informado no header da requisição)
-  texto
-  array com fotos

### Dados retornados

-  sucesso/erro

### Objetivos gerais

-  validar token
-  buscar usuário
-  exigir ao menos uma foto na postagem
-  cadastrar postagem
-  cadastrar fotos da postagem
-  retornar sucesso ou erro

<br>

### POST - Curtir Postagem

### Dados enviados

-  token (informado no header da requisição)
-  id da postagem

### Dados retornados

-  sucesso/erro

### Objetivos gerais

-  validar token
-  buscar usuário
-  buscar postagem
-  verificar se o usuário já curtiu essa postagem
-  cadastrar curtida no banco de dados
-  retornar sucesso ou erro

<br>

### POST - Comentar Postagem

### Dados enviados

-  token (informado no header da requisição)
-  id da postagem
-  texto

### Dados retornados

-  sucesso/erro

### Objetivos gerais

-  validar token
-  buscar o usuário
-  validar o texto
-  buscar a postagem
-  cadastrar comentário
-  retornar sucesso ou erro

<br>

### POST - Upload de imagens

### Dados enviados

-  nome do arquivo da imagem
-  imagem codificada com base64

### Dados retornados

-  sucesso/erro

### Objetivos gerais

-  fazer upload da imagem no servidor na nuvem
-  retornar caminho da imagem e url

<br>

### POST - Deletar imagens

### Dados enviados

-  nome do arquivo da imagem

### Dados retornados

-  sucesso/erro

### Objetivos gerais

-  deletar imagem armazenada
-  retornar mensagem de sucesso ou erro

<br>

---

<br>

Atividade desenvolvida para o curso de Desenvolvedor Web Full Stack da Cubos Academy
