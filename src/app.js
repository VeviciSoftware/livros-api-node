import express from "express";

const app = express();
app.use(express.json()); //Middleware para o express entender JSON

const livros = [
    {
        id: 1,
        nome: "O Senhor dos Anéis",
        autor: "J. R. R. Tolkien"
    },
    {
        id: 2,
        nome: "Fundação",
        autor: "Isaac Asimov"
    },
    {
        id: 3,
        nome: "Duna",
        autor: "Frank Herbert"
    }
];


app.get("/", (req, res) => {
    res.status(200).send("Curso de Node.js");
});

app.get("/livros", (req, res) => {
    res.status(200).json(livros);
});

app.get("/livros/:id", (req, res) => {
    const id = req.params.id;
    const livro = livros.find(l => l.id == id);
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

export default app;


