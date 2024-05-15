import express from "express";
import conectaNaDatabase from "./config/dbConnect.js";
import routes from "./routes/index.js";

const conexao = await conectaNaDatabase();

conexao.on("error", (erro) => {
    console.error("Erro ao conectar no banco de dados", erro)
});

conexao.once("open", () => {
    console.log("Conectado no banco de dados");
})

const app = express();
routes(app);

// app.post("/livros", (req, res) => {
//     const livro = req.body;
//     livros.push(livro);
//     res.status(201).send("Livro adicionado com sucesso");
// });

app.put("/livros/:id", (req, res) => {
    const index = buscaLivro(+req.params.id);
    if (index === -1) {
        res.status(404).send("Livro não encontrado");
        return;
    }
    livros[index].titulo = req.body.titulo;
    res.status(200).send({message: "Livro atualizado com sucesso", livros});
});

app.delete("/livros/:id", (req, res) => {
    const index = buscaLivro(+req.params.id);
    if (index === -1) {
        res.status(404).send("Livro não encontrado");
        return;
    }
    livros.splice(index, 1);
    res.status(200).send({message: "Livro removido com sucesso", livros});
});

export default app;



