const express = require("express");
const usuarios = require("./controladores/usuarios");
const { login } = require("./controladores/login");
const postagens = require("./controladores/postagens");
const autenticacaoUsuario = require("./filtros/autenticacao");
const uploads = require("./controladores/uploads");
const rotas = express();

rotas.post("/cadastro", usuarios.cadastrarUsuarios);
rotas.post("/login", login);

rotas.post("/upload", uploads.uploadImagem);
rotas.post("/delete", uploads.excluirImagem);

rotas.use(autenticacaoUsuario);

rotas.get("/perfil", usuarios.obterPerfil);
rotas.put("/perfil", usuarios.atualizarPerfil);

rotas.post("/postagens", postagens.criarPostagem);
rotas.get("/postagens", postagens.feed);
rotas.post("/postagens/:postagemId/curtir", postagens.curtirPostagem);
rotas.post("/postagens/:postagemId/comentar", postagens.comentarPostagem);

module.exports = rotas;
