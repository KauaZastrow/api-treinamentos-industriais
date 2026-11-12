import {Sala} from '../model/Sala.js';
import {atualizar, buscarPorId, cadastrar, deletar, listar} from '../repository/salaRepository.js';

export  async function cadastrarSala(req, res) {

    try{
    const {nome, capacidade, localizacao} = req.body;
    if(!nome || !capacidade || !localizacao) {
        return res.status(400).json({mensagem: 'Todos os campos são obrigatórios!'});
    }
    const sala = new Sala(nome, capacidade, localizacao);

    const id = await cadastrar(sala);

    res.status(201).json({mensagem: 'Sala cadastrada com sucesso!', id_sala: id});
    }catch(erro) {
        res.status(500).json({mensagem: 'Erro ao cadastrar sala!' + erro});
    }
}

export async function listarSalas(req, res) {
    try{
        const listaDeSalas = await listar();
        res.status(200).json(listaDeSalas);
    } catch(erro) {
        res.status(500).json({mensagem: 'Erro ao listar salas!' + erro});
    }
}

export async function buscarSalaPorId(req, res) {
    try{
    const id = Number(req.params.id);
    
    const sala = await buscarPorId(id);

    if(!sala) {
       return res.status(404).json({mensagem: 'Sala não encontrada!'});
    }
    res.status(200).json(sala);
    }catch(erro) {
        res.status(500).json({mensagem: 'Erro ao buscar sala!' + erro});
    }
}

export async function atualizarSala(req, res) {
    try{
    const id = Number(req.params.id);

    const sala = await buscarPorId(id);

    if(!sala) {
        return res.status(404).json({mensagem: 'Sala não encontrada!'});
    }

    const {nome, capacidade, localizacao} = req.body;

    if(nome !== undefined) {
        sala.nome = nome;
    }
    if(capacidade !== undefined) {
        sala.capacidade = capacidade;
    }
    if(localizacao !== undefined) {
        sala.localizacao = localizacao;
    }

    const resultado = await atualizar(id, sala);

    if(resultado === 0) {
        return res.status(500).json({mensagem: 'Nenhuma sala atualizada!'});
    }

    res.status(200).json({mensagem: 'Sala atualizada com sucesso!'});
    
    }catch(erro) {
        res.status(500).json({mensagem: 'Erro ao atualizar sala!' + erro});
    }
}

export async function deletarSala(req, res) {
    try{
    const id = Number(req.params.id);

    const sala = await buscarPorId(id);
    

    if(!sala) {
        return res.status(404).json({mensagem: 'Sala não encontrada!'});
    }

    const resultado = await deletar(id);

    if(resultado === 0) {
        return res.status(500).json({mensagem: 'Nenhuma sala deletada!'});
    }

    res.status(200).json({mensagem: 'Sala deletada com sucesso!'});
    }catch(erro) {
        res.status(500).json({mensagem: 'Erro ao deletar sala!' + erro});
    }
}