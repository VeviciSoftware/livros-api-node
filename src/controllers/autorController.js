import mongoose from "mongoose";
import { autor } from "../models/Autor.js";
import NaoEncontrado from "../errors/NaoEncontrado.js";

class AutorController {

  static listarAutores = async (req, res, next) => {
    try {
      const listaAutores = await autor.find({});
      res.status(200).json(listaAutores);
    } catch (erro) {
      next(erro);
    }
  };

  static listarAutorPorId = async (req, res, next) => {
    try {
      const id = req.params.id;
      const autorEncontrado = await autor.findById(id);

      if (autorEncontrado) {
        res.status(200).json(autorEncontrado);
      } else {
        next(new NaoEncontrado("ID do autor não encotnrado."))
      }
    } catch (erro) {
      next(erro);
    }
  };

  static cadastrarAutor = async (req, res, next) => {
    try {
      const novoAutor = await autor.create(req.body);
      res.status(201).json({ message: "Criado com sucesso", autor: novoAutor });
    } catch (erro) {
      next(erro);
    }
  };

  static atualizarAutor = async (req, res, next) => {
    try {
      const id = req.params.id;
      const autorEncontrado = await autor.findById(id);

      if (autorEncontrado) {
        await autor.findByIdAndUpdate(id, req.body);
        res.status(200).json({ message: "Autor atualizado" });
      } else {
        next(new NaoEncontrado("ID do autor não encontrado."));
      }
    } catch (erro) {
      next(erro);
    }
  };

  static excluirAutor = async (req, res, next) => {
    try {
      const id = req.params.id;
      const autorEncontrado = await autor.findById(id);

      if (autorEncontrado) {
        await autor.findByIdAndDelete(id);
        res.status(200).json({ message: "Autor excluído com sucesso" });
      } else {
        next(new NaoEncontrado("ID do autor não encontrado."));
      }
    } catch (erro) {
      next(erro);
    }
  };
}

export default AutorController;