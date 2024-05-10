import mongoose, { mongo } from "mongoose";

async function conectaNaDatabase() {
    mongoose.connect("mongodb+srv://admin:Fla231119@cluster0.g7mhgbt.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0");

    return mongoose.connection;
} 

export default conectaNaDatabase;