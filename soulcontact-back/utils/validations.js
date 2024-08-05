import Joi from "joi";

//Validação para a inserção de um contato

export const contatoValidation = Joi.object({
    nome: Joi.string().max(150).required(), //string obrigatória de no maximo 150 caracteres.
    sobrenome: Joi.string().max(150), //nao é required porque no models ele n é obrigatório 
    email: Joi.string().email(),
    telefone: Joi.string().required(),
    observacoes: Joi.string().max(200),
    favorito: Joi.boolean()
}); //estamos validando um esquema