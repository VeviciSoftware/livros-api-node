import express from "express";
import conectaNaDatabase from "./config/dbConnect.js"
import routes from "./routes/index.js"
import manipuladorDeErros from "./middlewares/manipuladorDeErros.js";
import manipulador404 from "./middlewares/manipulador404.js";

conectaNaDatabase().then(db => {
  db.on("error", console.log.bind(console, 'Erro de conexão'))
  db.once("open", () => {
    console.log('Conexão com o banco feita com sucesso')
  })
});

const app = express();
app.use(express.json())
routes(app);

app.use(manipulador404);

app.use(manipuladorDeErros);

export default app