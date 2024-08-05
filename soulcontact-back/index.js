import express from "express"; //importa o express
import { config } from "dotenv";
config(); //chamando função config. o config carrega as variaveis do .env
import mongoose from "mongoose"; //importando mongoose
import { contatoRouter } from "./routes/contatos.js";


mongoose.connect(process.env.MONGODB_URL)
.then(() => {
    console.log("Mongo DB Conectado!")
}).catch((err) => {
    console.log(err);
}); //fazendo a conexão com o mongodb de forma assíncrona, por isso o uso do then e o catch pra mostrar se rolar um erro

const app = express(); //cria instância do express
app.use(express.json()); // uso para fazer o body com json

app.use(contatoRouter); //chamando o cliente 



  app.listen(3000, () => {
    console.log("Servidor rodando em http://localhost:3000")
});
