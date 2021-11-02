const knex = require("../conexao");

async function criarPostagem(req, res) {
   const { id } = req.usuario;
   const { texto, fotos } = req.body;

   if (!fotos || fotos.length === 0) {
      return res.status(400).json({ mensagem: "É preciso inserir fotos na postagem." });
   }

   try {
      const postagem = await knex("postagens")
         .insert({ texto, usuario_id: id })
         .returning("*");
      if (!postagem) {
         return res.status(400).json({ mensagem: "Não foi possível criar a postagem." });
      }

      for (const foto of fotos) {
         foto.postagem_id = postagem[0].id;
      }

      const fotosPostagem = await knex("postagem_fotos").insert(fotos);
      if (!fotosPostagem) {
         await knex("postagens").where({ id: postagem[0].id }).del();
         return res.status(400).json({ mensagem: "Não foi possível criar a postagem." });
      }

      res.status(200).json({ mensagem: "Postagem criada com sucesso." });
   } catch (error) {
      return res.status(400).json({ mensagem: error.message });
   }
}

async function curtirPostagem(req, res) {
   const { postagemId } = req.params;
   const { id } = req.usuario;

   try {
      const postagem = await knex("postagens").where({ id: postagemId }).first();
      if (!postagem) {
         return res.status(404).json({ mensagem: "Postagem não encontrada." });
      }

      const jaCurtiu = await knex("postagem_curtidas")
         .where({ usuario_id: id, postagem_id: postagemId })
         .first();
      if (jaCurtiu) {
         return res
            .status(400)
            .json({ mensagem: "Postagem já foi curtida por esse usuário." });
      }

      const curtida = await knex("postagem_curtidas").insert({
         usuario_id: id,
         postagem_id: postagemId,
      });

      if (!curtida) {
         return res.status(400).json({ mensagem: "Não foi possível curtir a postagem." });
      }

      res.status(200).json({ mensagem: "Postagem curtida com sucesso!" });
   } catch (error) {
      return res.status(400).json({ mensagem: error.message });
   }
}

async function comentarPostagem(req, res) {
   const { postagemId } = req.params;
   const { id } = req.usuario;
   const { texto } = req.body;

   if (!texto) {
      return res
         .status(400)
         .json({ mensagem: "É preciso inserir um texto para o comentário." });
   }

   try {
      const postagem = await knex("postagens").where({ id: postagemId }).first();
      if (!postagem) {
         return res.status(404).json({ mensagem: "Postagem não encontrada." });
      }

      const comentario = await knex("postagem_comentarios").insert({
         usuario_id: id,
         postagem_id: postagemId,
         texto,
      });
      if (!comentario) {
         return res.status(400).json({ mensagem: "Não foi possível inserir o comentário." });
      }

      res.status(200).json({ mensagem: "Comentário criado com sucesso." });
   } catch (error) {
      return res.status(400).json({ mensagem: error.message });
   }
}

async function feed(req, res) {
   const { id } = req.usuario;
   const offset = req.query.offset || "0";

   try {
      const postagens = await knex("postagens")
         .where("usuario_id", "!=", id)
         .limit(10)
         .offset(offset);

      if (postagens.length !== 0) {
         for (const postagem of postagens) {
            const usuario = await knex("usuarios")
               .where({ id: postagem.usuario_id })
               .select("imagem", "username", "verificado")
               .first();
            postagem.usuario = usuario;

            const fotos = await knex("postagem_fotos")
               .where({ postagem_id: postagem.id })
               .select("imagem");
            postagem.fotos = fotos;

            const curtidas = await knex("postagem_curtidas").where({
               postagem_id: postagem.id,
            });
            postagem.curtidas = curtidas.length;

            postagem.curtidaPorMim = curtidas.find((curtida) => curtida.usuario_id === id)
               ? true
               : false;

            const comentarios = await knex("postagem_comentarios")
               .where({ postagem_id: postagem.id })
               .leftJoin("usuarios", "usuarios.id", "postagem_comentarios.usuario_id")
               .select("usuarios.username", "postagem_comentarios.texto");

            postagem.comentarios = comentarios;
         }
      }

      res.status(200).json(postagens);
   } catch (error) {
      return res.status(400).json({ mensagem: error.message });
   }
}

module.exports = { criarPostagem, curtirPostagem, comentarPostagem, feed };
