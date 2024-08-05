
import {model, Schema} from "mongoose";


export const Contato = model("contato", new Schema({
//aqui eu determino os campos que vai ter na coleção. 
// coloquei um objeto e la dentro vou por nome, sobrenome, email, etc.
    nome:{
        //configurar a propriedade nome, uso os tipos do javascript
        type: String, 
        required: true,
    },
    sobrenome:{
        type: String,
    },
    email: {
        type: String,
        unique: true //impedir que haja repetição do email
    },
    telefone: {
        type: String,
        unique: true, // impedir que haja repetição de telefone
        required: true
    },
    observacoes: {
        type: String
    },
    favorito:{
        type: Boolean,
        default: false
    }
}));

