import mongoose, { mongo } from "mongoose";

async function conectaNaDatabase() {
    mongoose.connect(process.env.DB_CONNECTION);

    return mongoose.connection;
} 

export default conectaNaDatabase;