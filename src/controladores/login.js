const jwt = require("jsonwebtoken");
const senhaHash = require("../senhaHash");
const knex = require("../conexao");
const bcrypt = require("bcrypt");

async function login(req, res) {
   const { username, senha } = req.body;

   if (!username || !senha) {
      return res.status(400).json({ mensagem: "Username e senha devem ser informados" });
   }

   try {
      const usuario = await knex("usuarios").where({ username }).first();
      if (!usuario) {
         return res.status(404).json({ mensagem: "Usuário não encontrado." });
      }

      const conferirSenha = await bcrypt.compare(senha, usuario.senha);
      if (!conferirSenha) {
         return res.status(401).json({ mensagem: "Username e/ou senha incorreto(s)" });
      }

      const token = jwt.sign({ id: usuario.id, username: usuario.username }, senhaHash, {
         expiresIn: "8h",
      });

      const { senha: senhaUsuario, ...dadosUsuario } = usuario;

      res.status(200).json({ usuario: dadosUsuario, token });
   } catch (error) {
      return res.status(400).json({ mensagem: error.message });
   }
}

module.exports = { login };
