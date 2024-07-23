import mongoose from "mongoose";
import { autorSchema } from "./Autor.js";

const livroSchema = new mongoose.Schema({
    titulo: {
        type: String,
        required: [true, "O título do livro é obrigatório."]
    },
    editora: {
        type: String,
        required: [true, "A editora do livro é obrigatória."],
        enum: {
            values: ["Moderna", "Companhia das Letras", "Saraiva", "Abril"],
            message: "Editora `{VALUE}` inválida. Selecione uma das opções disponíveis."
        }
    },
    preco: {
        type: Number,
        required: [true, "O preço do livro é obrigatório."]
    },
    paginas: {
        type: Number,
        required: [true, "O número de páginas do livro é obrigatório."],
        min: [10, "O livro deve ter no mínimo 1 página."],
        max: [5000, "O livro deve ter no máximo 2000 páginas."]
    },
    autor: {
        type: autorSchema,
        required: [true, "O autor do livro é obrigatório."],
        ref: 'autores'
    }
}, { versionKey: false });

const livro = mongoose.model("Livros", livroSchema);

export default livro;