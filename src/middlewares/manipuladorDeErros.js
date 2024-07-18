import mongoose from "mongoose";
import ErroBase from "../errors/ErroBase.js";

function manipuladorDeErros(erro, req, res, next) {
    if (erro instanceof mongoose.Error.CastError) {
      return res.status(400).json({ message: "Um ou mais dados fornecidos estão incorretos" });
    } else if (erro instanceof mongoose.Error.ValidationError) {
      const mensagensErro = Object.values(erro.errors)
        .map((erro) => erro.message)
        .join(", ");
      res.status(400).send({ message: `Os seguintes erros foram encontrados: ${mensagensErro}` });
    } else {
      new ErroBase(erro.message).enviarResposta(res);
    }
  }


export default manipuladorDeErros;