import express from "express";

const app = express();
app.use(express.json()); //Middleware para o express entender JSON

const livros = [
    {
        id: 1,
        titulo: "O Senhor dos Anéis",
        autor: "J. R. R. Tolkien"
    },
    {
        id: 2,
        titulo: "Fundação",
        autor: "Isaac Asimov"
    },
    {
        id: 3,
        titulo: "Duna",
        autor: "Frank Herbert"
    }
];

function buscaLivro(id) {
    return livros.findIndex(livro => livro.id === id);
}


app.get("/", (req, res) => {
    res.status(200).send("Curso de Node.js");
});

app.get("/livros", (req, res) => {
    res.status(200).json(livros);
});

app.get("/livros/:id", (req, res) => {
    const id = +req.params.id;
    const livro = buscaLivro(id);
    if (!livro) {
        res.status(404).send("Livro não encontrado");
    }
    res.status(200).json(livro);
});

app.post("/livros", (req, res) => {
    const livro = req.body;
    livros.push(livro);
    res.status(201).send("Livro adicionado com sucesso");
});

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

// mongodb+srv://admin:<password>@cluster0.g7mhgbt.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0

