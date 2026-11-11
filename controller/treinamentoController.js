import { Treinamento } from "../model/Treinamento.js"
import { atualizar, cadastrar, listar, deletar, buscarPorId, buscarPorNome } from "../repository/treinamentoRepository.js"

export async function cadastrarTreinamento(req, res) {
    try {
        const { nome, cargaHoraria, modalidade } = req.body;

        if (!nome || !cargaHoraria || !modalidade) return res.status(400).json({
            mensagem: "Nome e descricao sao obrigatorias"
        })

        const treinamento = new Treinamento(nome, cargaHoraria, modalidade);

        const id = await cadastrar(treinamento);

        res.status(201).json({
            mensagem: "Treinamento cadastrado com sucesso",
            id_treinamento: id
        });
    } catch (erro) {
        res.status(500).json({
            mensagem: "Erro ao cadastrar treinamento: " + erro
        })
    }
}

export async function listarTreinamentos(req, res) {
    try {
        const listaTreinamentos = await listar()

        res.status(200).json(listaTreinamentos);
    } catch (erro) {
        res.status(500).json({
            mensagem: "Erro ao listar treinamentoes: " + erro
        })
    }
}

export async function buscarTreinamentoPorNome(req, res) {
    try {
        const { nome } = req.params; // ou req.query.nome

        const treinamento = await buscarPorNome(nome);

        if (!treinamento) {
            return res.status(404).json({ mensagem: 'Treinamento não encontrado.' });
        }

        return res.status(200).json(treinamento);
    } catch (erro) {
        return res.status(500).json({
            mensagem: 'Erro ao buscar treinamento.',
            detalhe: erro.message,
        });
    }
}

export async function buscarTreinamentoPorId(req, res) {
    try {
        const id = Number(req.params.id);

        const treinamento = await buscarPorId(id);

        if (!treinamento) {
            return res.status(404).json({ mensagem: "Treinamento não encontrada" });
        }

        res.status(200).json(treinamento);
    } catch (erro) {
        res.status(500).json({
            mensagem: "Erro ao buscar treinamento: " + erro
        })
    }
}

export async function atualizarTreinamento(req, res) {
    try {
        const id = Number(req.params.id);

        const treinamento = await buscarPorId(id);

        if (!treinamento) {
            return res.status(404).json({ mensagem: "Treinamento não encontrada" })
        }

        const { nome, cargaHoraria, modalidade } = req.body;

        if (nome != undefined) {
            treinamento.nome = nome;
        }

        if (cargaHoraria != undefined) {
            treinamento.cargaHoraria = cargaHoraria;
        }

        if (modalidade != undefined) {
            treinamento.modalidade = modalidade;
        }

        const resultado = await atualizar(id, treinamento);

        if (resultado === 0) {
            return res.status(404).json({ mensagem: "Nenhuma atualizacao deletada" })
        }

        res.status(200).json({ mensagem: "Treinamento atualizada com sucesso" })
    } catch (erro) {
        res.status(500).json({
            mensagem: "Erro ao atualizar treinamento: " + erro
        })
    }
}

export async function deletarTreinamento(req, res) {
    try {
        const id = Number(req.params.id);

        const treinamento = await buscarPorId(id);

        if (!treinamento) {
            return res.status(404).json({ mensagem: " Treinamento não encontrada" });
        }

        const resultado = await deletar(id);

        if (resultado === 0) {
            return res.status(404).json({ mensagem: "Nenhuma treinamento deletada" })
        }

        res.status(204);
    } catch (erro) {
        res.status(500).json({
            mensagem: "Erro ao deletar treinamento: " + erro
        })
    }
}