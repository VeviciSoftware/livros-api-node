import { livro } from "../models/index.js";
import { autor } from "../models/index.js";
import NaoEncontrado from "../errors/NaoEncontrado.js";

class LivroController {

  static listarLivros = async (req, res, next) => {
    try {
      const listaLivros = await livro.find({});
      res.status(200).json(listaLivros);
    } catch (erro) {
      next(erro);
    }
  };

  static listarLivroPorId = async (req, res, next) => {
    try {
        const id = req.params.id;
        const livroEncontrado = await livro.findById(id);

        if(!livroEncontrado) {
            next(new NaoEncontrado("ID do livro não encontrado."));
        }

        res.status(200).json(livroEncontrado);
    } catch (erro) {
        next(erro);
    }
  };

  static buscarLivrosPorAutor = async (req, res, next) => {
    const autorNome = req.query.autor;
    try {
      const autorEncontrado = await autor.find({ nome: autorNome });

      if(autorEncontrado.length === 0) {
        next(new NaoEncontrado("Autor não encontrado."));
      }

      res.status(200).json(autorEncontrado);
    } catch (erro) {
      next(erro);
    }
  }

  static cadastrarLivro = async (req, res, next) => {
    const novoLivro = req.body;
    try {
      const autorEncontrado = await autor.findById(novoLivro.autor);
      const livroCompleto = {...novoLivro, autor: {
        ...autorEncontrado._doc
      }};
      const livroCriado = await livro.create(livroCompleto);
      res.status(201).json({ message: "Criado com sucesso.", livro: novoLivro });
    } catch (erro) {
      next(erro);
    }
  }

  static atualizarLivro = async (req, res, next) => {
    try {
      const id = req.params.id;
      const livroAtualizado = await livro.findByIdAndUpdate(id, req.body, { new: true });

      if (!livroAtualizado) {
        next(new NaoEncontrado("ID do livro não encontrado."));
      } else {
        res.status(200).json({ message: "Livro atualizado com sucesso." });
      }
    } catch (erro) {
      next(erro);
    }
  };

  static excluirLivro = async (req, res, next) => {
    try {
      const id = req.params.id;
      const livroExcluido = await livro.findByIdAndDelete(id);

      if (!livroExcluido) {
        next(new NaoEncontrado("ID do livro não encontrado."));
      } else {
        res.status(200).json({ message: "Livro excluído com sucesso." });
      }
    } catch (erro) {
      next(erro);
    }
  };
};

export default LivroController;