import express from 'express';
import LivroController from '../controllers/livroController.js';

const routes = express.Router();

// A rotas no Express devem ser deifinidas da mais complexa para a mais simples
routes.get("/livros", LivroController.listarLivros);
routes.get("/livros/buscaAutor", LivroController.buscarLivrosPorAutor);
routes.get("/livros/:id", LivroController.listarLivroPorId);
routes.post("/livros", LivroController.cadastrarLivro);
routes.put("/livros/:id", LivroController.atualizarLivro);
routes.delete("/livros/:id", LivroController.excluirLivro);

export default routes;