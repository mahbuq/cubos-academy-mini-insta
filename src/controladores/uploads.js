const supabase = require("../supabase");

async function uploadImagem(req, res) {
   const { nome, imagem } = req.body;

   const bufferImg = Buffer.from(imagem, "base64");

   try {
      const { data, error } = await supabase.storage
         .from(process.env.SUPABASE_BUCKET)
         .upload(nome, bufferImg);

      if (error) {
         return res.status(400).json(error.message);
      }

      const { publicURL, error: errorPublicUrl } = supabase.storage
         .from(process.env.SUPABASE_BUCKET)
         .getPublicUrl(nome);

      if (errorPublicUrl) {
         return res.status(400).json(error.message);
      }

      return res.status(200).json({ data, publicURL });
   } catch (error) {
      return res.status(400).json(error.message);
   }
}

async function excluirImagem(req, res) {
   const { nome } = req.body;

   try {
      const excluirImg = await supabase.storage
         .from(process.env.SUPABASE_BUCKET)
         .remove([nome]);

      if (excluirImg.error) {
         return res.status(400).json(error.message);
      }

      res.status(200).json({ mensagem: "Imagem excluída com sucesso!" });
   } catch (error) {
      return res.status(400).json(error.message);
   }
}

module.exports = { uploadImagem, excluirImagem };
