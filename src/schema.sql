CREATE DATABASE mini_insta;

DROP TABLE IF EXISTS usuarios;

CREATE TABLE usuarios (
  id serial PRIMARY KEY,
  nome text,
  imagem text,
  username text NOT NULL UNIQUE,
  email text UNIQUE,
  site text,
  bio text,
  telefone text,
  genero text,
  senha text NOT NULL,
  verificado boolean DEFAULT false
);

DROP TABLE IF EXISTS postagens;

CREATE TABLE postagens (
  id serial PRIMARY KEY,
  usuario_id int NOT NULL,
  data timestamptz DEFAULT NOW(),
  texto text,
  FOREIGN KEY (usuario_id) REFERENCES usuarios(id)
);

DROP TABLE IF EXISTS postagem_fotos;

CREATE TABLE postagem_fotos (
  id serial PRIMARY KEY,
  postagem_id int NOT NULL,
  imagem text NOT NULL,
  FOREIGN KEY (postagem_id) REFERENCES postagens(id)
);

DROP TABLE IF EXISTS postagem_comentarios;

CREATE TABLE postagem_comentarios (
  id serial PRIMARY KEY,
  texto text NOT NULL,
  data timestamptz DEFAULT NOW(),
  usuario_id int NOT NULL,
  postagem_id int NOT NULL,
  FOREIGN KEY (postagem_id) REFERENCES postagens(id),
  FOREIGN KEY (usuario_id) REFERENCES usuarios(id)
);

DROP TABLE IF EXISTS postagem_curtidas;

CREATE TABLE postagem_curtidas (
  usuario_id int NOT NULL,
  postagem_id int NOT NULL,
  data timestamptz DEFAULT NOW(),
  FOREIGN KEY (postagem_id) REFERENCES postagens(id),
  FOREIGN KEY (usuario_id) REFERENCES usuarios(id)
);








