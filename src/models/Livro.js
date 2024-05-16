import mongoose from "mongoose";
import { autorSchema } from "./Autor.js";

const livroSchema = new mongoose.Schema({
    titulo: {
        type: String,
        required: true
    },
    editora: {
        type: String,
        required: true
    },
    preco: {
        type: Number,
        required: true
    },
    paginas: {
        type: Number,
        required: true
    },
    autor: {
        type: autorSchema,
        required: true
    }
}, { versionKey: false });

const livro = mongoose.model("Livros", livroSchema);

export default livro;