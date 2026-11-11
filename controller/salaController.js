import { Sala } from "../model/Sala.js"
import { atualizar, cadastrar, listar, deletar, buscarPorId, buscarPorNome } from "../repository/salaRepository.js"

export async function cadastrarSala(req, res) {
    try {
        const { nome, descricao } = req.body;

        if (!nome || !descricao) return res.status(400).json({
            mensagem: "Nome e descricao sao obrigatorias"
        })

        const sala = new Sala(nome, descricao);

        const id = await cadastrar(sala);

        res.status(201).json({
            mensagem: "Sala cadastrado com sucesso",
            id_sala: id
        });
    } catch (erro) {
        res.status(500).json({
            mensagem: "Erro ao cadastrar sala: " + erro
        })
    }
}

export async function listarSalas(req, res) {
    try {
        const listaSalas = await listar()

        res.status(200).json(listaSalas);
    } catch (erro) {
        res.status(500).json({
            mensagem: "Erro ao listar salaes: " + erro
        })
    }
}

export async function buscarSalaPorNome(req, res) {
    try {
        const { nome } = req.params; // ou req.query.nome

        const sala = await buscarPorNome(nome);

        if (!sala) {
            return res.status(404).json({ mensagem: 'Sala não encontrado.' });
        }

        return res.status(200).json(sala);
    } catch (erro) {
        return res.status(500).json({
            mensagem: 'Erro ao buscar sala.',
            detalhe: erro.message,
        });
    }
}

export async function buscarSalaPorId(req, res) {
    try {
        const id = Number(req.params.id);

        const sala = await buscarPorId(id);

        if (!sala) {
            return res.status(404).json({ mensagem: "Sala não encontrada" });
        }

        res.status(200).json(sala);
    } catch (erro) {
        res.status(500).json({
            mensagem: "Erro ao buscar sala: " + erro
        })
    }
}

export async function atualizarSala(req, res) {
    try {
        const id = Number(req.params.id);

        const sala = await buscarPorId(id);

        if (!sala) {
            return res.status(404).json({ mensagem: "Sala não encontrada" })
        }

        const { nome, descricao } = req.body;

        if (nome != undefined) {
            sala.nome = nome;
        }

        if (descricao != undefined) {
            sala.descricao = descricao;
        }

        const resultado = await atualizar(id, sala);

        if (resultado === 0) {
            return res.status(404).json({ mensagem: "Nenhuma atualizacao deletada" })
        }

        res.status(200).json({ mensagem: "Sala atualizada com sucesso" })
    } catch (erro) {
        res.status(500).json({
            mensagem: "Erro ao atualizar sala: " + erro
        })
    }
}

export async function deletarSala(req, res) {
    try {
        const id = Number(req.params.id);

        const sala = await buscarPorId(id);

        if (!sala) {
            return res.status(404).json({ mensagem: " Sala não encontrada" });
        }

        const resultado = await deletar(id);

        if (resultado === 0) {
            return res.status(404).json({ mensagem: "Nenhuma sala deletada" })
        }

        res.status(204);
    } catch (erro) {
        res.status(500).json({
            mensagem: "Erro ao deletar sala: " + erro
        })
    }
}