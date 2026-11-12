import {Instrutor} from '../model/Instrutor.js';
import {atualizar, buscarPorId, cadastrar, deletar, listar, buscarPorNome} from '../repository/instrutorRepository.js';

export  async function cadastrarInstrutor(req, res) {

    try{
    const {nome, especialidade, email} = req.body;
    if(!nome || !especialidade || !email) {
        return res.status(400).json({mensagem: 'Todos os campos são obrigatórios!'});
    }
    const instrutor = new Instrutor(nome, especialidade, email);

    const id = await cadastrar(instrutor);

    res.status(201).json({mensagem: 'Instrutor cadastrado com sucesso!', id_instrutor: id});
    }catch(erro) {
        res.status(500).json({mensagem: 'Erro ao cadastrar instrutor!' + erro});
    }
}

export async function listarInstrutores(req, res) {
    try{
        const listaDeInstrutores = await listar();
        res.status(200).json(listaDeInstrutores);
    } catch(erro) {
        res.status(500).json({mensagem: 'Erro ao listar instrutores!' + erro});
    }
}

export async function buscarInstrutorPorId(req, res) {
    try{
    const id = Number(req.params.id);
    
    const instrutor = await buscarPorId(id);

    if(!instrutor) {
       return res.status(404).json({mensagem: 'Instrutor não encontrado!'});
    }
    res.status(200).json(instrutor);
    }catch(erro) {
        res.status(500).json({mensagem: 'Erro ao buscar instrutor!' + erro});
    }
}

export async function atualizarInstrutor(req, res) {
    try{
    const id = Number(req.params.id);

    const instrutor = await buscarPorId(id);

    if(!instrutor) {
        return res.status(404).json({mensagem: 'Instrutor não encontrado!'});
    }

    const {nome, especialidade, email} = req.body;

    if(nome !== undefined) {
        instrutor.nome = nome;
    }
    if(especialidade !== undefined) {
        instrutor.especialidade = especialidade;
    }
    if(email !== undefined) {
        instrutor.email = email;
    }

    const resultado = await atualizar(id, instrutor);

    if(resultado === 0) {
        return res.status(500).json({mensagem: 'Nenhum instrutor atualizado!'});
    }

    res.status(200).json({mensagem: 'Instrutor atualizado com sucesso!'});
    
    }catch(erro) {
        res.status(500).json({mensagem: 'Erro ao atualizar instrutor!' + erro});
    }
}

export async function deletarInstrutor(req, res) {
    try{
    const id = Number(req.params.id);

    const instrutor = await buscarPorId(id);
    

    if(!instrutor) {
        return res.status(404).json({mensagem: 'Instrutor não encontrado!'});
    }

    const resultado = await deletar(id);

    if(resultado === 0) {
        return res.status(500).json({mensagem: 'Nenhum instrutor deletado!'});
    }

    res.status(200).json({mensagem: 'Instrutor deletado com sucesso!'});
    }catch(erro) {
        res.status(500).json({mensagem: 'Erro ao deletar instrutor!' + erro});
    }
}

export async function buscarInstrutorPorNome(req, res) {
    try{
        const nome = req.params.nome;
        const instrutores = await buscarPorNome(nome);
        res.status(200).json(instrutores);
    } catch(erro) {
        res.status(500).json({mensagem: 'Erro ao buscar instrutor por nome!' + erro});
    }
}