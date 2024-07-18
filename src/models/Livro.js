import mongoose from "mongoose";
import { autorSchema } from "./Autor.js";

const livroSchema = new mongoose.Schema({
    titulo: {
        type: String,
        required: [true, "O título do livro é obrigatório."]
    },
    editora: {
        type: String,
        required: [true, "A editora do livro é obrigatória."]
    },
    preco: {
        type: Number,
        required: [true, "O preço do livro é obrigatório."]
    },
    paginas: {
        type: Number,
        required: [true, "O número de páginas do livro é obrigatório."] 
    },
    autor: {
        type: autorSchema,
        required: [true, "O autor do livro é obrigatório."],
        ref: 'autores'
    }
}, { versionKey: false });

const livro = mongoose.model("Livros", livroSchema);

export default livro;