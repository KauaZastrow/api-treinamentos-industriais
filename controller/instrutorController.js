import { Instrutor } from "../model/Instrutor.js"
import { atualizar, cadastrar, listar, deletar, buscarPorId, buscarPorNome } from "../repository/instrutorRepository.js"

export async function cadastrarInstrutor(req, res) {
    try {
        const { nome, descricao } = req.body;

        if (!nome || !descricao) return res.status(400).json({
            mensagem: "Nome e descricao sao obrigatorias"
        })

        const instrutor = new Instrutor(nome, descricao);

        const id = await cadastrar(instrutor);

        res.status(201).json({
            mensagem: "Instrutor cadastrado com sucesso",
            id_instrutor: id
        });
    } catch (erro) {
        res.status(500).json({
            mensagem: "Erro ao cadastrar instrutor: " + erro
        })
    }
}

export async function listarInstrutores(req, res) {
    try {
        const listaInstrutors = await listar()

        res.status(200).json(listaInstrutors);
    } catch (erro) {
        res.status(500).json({
            mensagem: "Erro ao listar instrutores: " + erro
        })
    }
}

export async function buscarInstrutorPorNome(req, res) {
    try {
        const { nome } = req.params; // ou req.query.nome

        const instrutor = await buscarPorNome(nome);

        if (!instrutor) {
            return res.status(404).json({ mensagem: 'Instrutor não encontrado.' });
        }

        return res.status(200).json(instrutor);
    } catch (erro) {
        return res.status(500).json({
            mensagem: 'Erro ao buscar instrutor.',
            detalhe: erro.message,
        });
    }
}

export async function buscarInstrutorPorId(req, res) {
    try {
        const id = Number(req.params.id);

        const instrutor = await buscarPorId(id);

        if (!instrutor) {
            return res.status(404).json({ mensagem: "Instrutor não encontrada" });
        }

        res.status(200).json(instrutor);
    } catch (erro) {
        res.status(500).json({
            mensagem: "Erro ao buscar instrutor: " + erro
        })
    }
}

export async function atualizarInstrutor(req, res) {
    try {
        const id = Number(req.params.id);

        const instrutor = await buscarPorId(id);

        if (!instrutor) {
            return res.status(404).json({ mensagem: "Instrutor não encontrada" })
        }

        const { nome, descricao } = req.body;

        if (nome != undefined) {
            instrutor.nome = nome;
        }

        if (descricao != undefined) {
            instrutor.descricao = descricao;
        }

        const resultado = await atualizar(id, instrutor);

        if (resultado === 0) {
            return res.status(404).json({ mensagem: "Nenhuma atualizacao deletada" })
        }

        res.status(200).json({ mensagem: "Instrutor atualizada com sucesso" })
    } catch (erro) {
        res.status(500).json({
            mensagem: "Erro ao atualizar instrutor: " + erro
        })
    }
}

export async function deletarInstrutor(req, res) {
    try {
        const id = Number(req.params.id);

        const instrutor = await buscarPorId(id);

        if (!instrutor) {
            return res.status(404).json({ mensagem: " Instrutor não encontrada" });
        }

        const resultado = await deletar(id);

        if (resultado === 0) {
            return res.status(404).json({ mensagem: "Nenhuma instrutor deletada" })
        }

        res.status(204);
    } catch (erro) {
        res.status(500).json({
            mensagem: "Erro ao deletar instrutor: " + erro
        })
    }
}