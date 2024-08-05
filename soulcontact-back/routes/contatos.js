import { contatoValidation } from "../utils/validations.js";
import {Contato} from "../models/contato.js"
import { Router } from "express";

export const contatoRouter = Router();



// ----- Adicionando CRUD -----

//  Inserção de contato [POST] 
contatoRouter.post("/contatos", async (req,res) => {
    //error é um objeto com detalhes dos erros de validação, se estiver td ok ele vai ficar nulo
    const {error, value} = contatoValidation.validate(req.body, {abortEarly: false}); //pega o esquema, compara com o body 
    if (error){
        ///http 400 => bad request - indica que a requisição tem dados inválidos
        res.status(400).json({message: "Dados inválidos", error: error.details});
        return; // return pq ele para execução 
    }

    //estou desestruturando pq as vezes tem coisa que eu nao quero usar pra inserir campo no body;
    const {nome, sobrenome, email, telefone, observacoes, favorito} = value; // propriedades do contato. 
    try { // vou criar o contato usando o model e salvar o model no mongodb, por isso eu importo o model
        const novoContato = new Contato({nome, sobrenome, email, telefone, observacoes, favorito}) //permite criar um documento
        await novoContato.save() // aqui ele salva o contato
        res.json({message: "Contado criado com sucesso."})
    }catch(err){
        res.status(500).json({message: "Um erro ocorreu ao adicionar o contato", error: err})
    }
});

// Listagem de contatos [GET]

// Todos os contatos
contatoRouter.get("/contatos", async(req,res) =>{
    //vou usar o model de contato pra listar todos os contatos
    const lista = await Contato.find();//guardando a lista de contatos
    res.json(lista) //mostrando a listagem
});

//Só um contato
contatoRouter.get("/contatos/:id", async(req,res) =>{
    const contato = await Contato.findById(req.params.id).select("-__v");

    if (contato){
        res.json(contato)
    } else {
        res.status(404).json({message: "Contato não encontrado."})
    }
});

//Atualização de contato [Put]
contatoRouter.put("/contatos/:id", async (req, res) => {

    // VALIDAÇÃO
        const {error, value} = contatoValidation.validate(req.body, {abortEarly: false});
        if (error){
            res.status(400).json({message: "Dados inválidos", error: error.details});
            return; 
        }

    const { nome, sobrenome, email, telefone, observacoes, favorito } = value;
  
    try {
      // Ele procura pelo contato indicado pelo ID, se existir ele será atualizado
      const contato = await Contato.findByIdAndUpdate(req.params.id, {nome, sobrenome, email, telefone, observacoes, favorito});
  
      if(contato) {
          res.json({message: "Contato atualizado com sucesso."});
      } else {
          res.status(404).json({message: "Contato não encontrado."});
      }
    } catch(err) {
      res.status(500).json({message: "Um erro ocorreu ao atualizar", error: err});
    }
  });

// Remoção de contato [DELETE]
contatoRouter.delete("/contatos/:id", async (req, res) => {
    try {
        const contato = await Contato.findByIdAndDelete(req.params.id)
        if(contato) {
            res.json({message: "Contato removido com sucesso."});
        } else {
            res.status(404).json({message: "Contato não encontrado."});
        }
  
    } catch(err){
        res.status(500).json({message: "Um erro ocorreu ao remover", error: err});

    }
});

