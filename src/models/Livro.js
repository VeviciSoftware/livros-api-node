import mongoose from "mongoose";

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
}, { versionKey: false });

const livro = mongoose.model("Livros", livroSchema);

export default livro;