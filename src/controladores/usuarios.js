const knex = require("../conexao");
const bcrypt = require("bcrypt");

async function cadastrarUsuarios(req, res) {
   const { username, senha } = req.body;

   if (!username || !senha) {
      return res.status(400).json({ mensagem: "É preciso informar um 'username' e 'senha'." });
   }

   if (senha.length < 4) {
      return res.status(400).json({ mensagem: "Senha deve possuir no mínimo 4 caracteres." });
   }

   try {
      const procurarUsername = await knex("usuarios").where({ username }).first();
      if (procurarUsername) {
         return res
            .status(400)
            .json({ mensagem: "Já existe um usuário com esse 'username' registrado." });
      }

      const senhaCriptografada = await bcrypt.hash(senha, 10);

      const usuario = await knex("usuarios").insert({ username, senha: senhaCriptografada });

      if (!usuario) {
         return res.status(400).json({ mensagem: "Não foi possível cadastrar o usuário." });
      }

      res.status(200).json({ mensagem: "Usuário cadastrado com sucesso!" });
   } catch (error) {
      return res.status(400).json({ mensagem: error.message });
   }
}

async function obterPerfil(req, res) {
   return res.status(200).json(req.usuario);
}

async function atualizarPerfil(req, res) {
   const { nome, imagem, username, email, site, bio, telefone, genero, senha, verificado } =
      req.body;
   const usuario = req.usuario;

   if (
      !nome &&
      !imagem &&
      !username &&
      !email &&
      !site &&
      !bio &&
      !telefone &&
      !genero &&
      !senha &&
      !verificado
   ) {
      return res
         .status(400)
         .json({ mensagem: "É necessário informar ao menos um campo para atualizar." });
   }

   try {
      if (senha) {
         if (senha < 4) {
            return res
               .status(400)
               .json({ mensagem: "Senha deve conter no mínimo 4 caracteres." });
         }

         senha = await bcrypt.hash(senha, 10);
      }

      if (email !== usuario.email) {
         const conferirEmail = await knex("usuarios").where({ email }).first();

         if (conferirEmail) {
            return res
               .status(400)
               .json({ mensagem: "Já existe um usuário cadastrado com este email" });
         }
      }

      if (username !== usuario.username) {
         const conferirUsername = await knex("usuarios").where({ username }).first();

         if (conferirUsername) {
            return res
               .status(400)
               .json({ mensagem: "Já existe um usuário cadastrado com este username" });
         }
      }

      const usuarioAtualizado = await knex("usuarios")
         .update({ nome, imagem, username, email, site, bio, telefone, genero, senha })
         .where({ id: usuario.id });

      if (!usuarioAtualizado) {
         return res.status(400).json({ mensagem: "Não foi possível atualizar usuário." });
      }

      res.status(200).json({ mensagem: "Usuário atualizado com sucesso." });
   } catch (error) {
      return res.status(400).json({ mensagem: error.message });
   }
}

module.exports = { cadastrarUsuarios, obterPerfil, atualizarPerfil };
