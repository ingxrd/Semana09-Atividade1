// usuario" com as seguintes propriedades: nome, email e senha;
import {model, Schema} from "mongoose";

export const Usuario = model("usuario", new Schema({
        nome:{
            type: String, 
            required: true,
        },
        email: {
            type: String,
            unique: true 
        },
        senha: {
            type: String,
            required: true
        },
    }));
    
    