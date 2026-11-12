import conexao from '../database/conexao.js';

export async function cadastrar(treinamento) {
    const sql = 'INSERT INTO treinamento (nome, carga_horaria, modalidade) VALUES (?, ?, ?)';
    const [resultado] = await conexao.execute(sql, [treinamento.nome, treinamento.carga_horaria, treinamento.modalidade]);
    return resultado.insertId;
}

export async function listar() {
    const sql = 'SELECT * FROM treinamento';
    const [resultado] = await conexao.execute(sql);
    return resultado;
}

export async function buscarPorId(id) {
    const sql = 'SELECT * FROM treinamento WHERE id_treinamento = ?';
    const [resultado] = await conexao.execute(sql, [id]);
    return resultado[0];
}

export async function atualizar(id, treinamento) {
    const sql = 'UPDATE treinamento SET nome = ?, carga_horaria = ?, modalidade = ? WHERE id_treinamento = ?';
    const [resultado] = await conexao.execute(sql, [treinamento.nome, treinamento.carga_horaria, treinamento.modalidade, id]);
    return resultado.affectedRows;
}

export async function deletar(id) {
    const sql = 'DELETE FROM treinamento WHERE id_treinamento = ?';
    const [resultado] = await conexao.execute(sql, [id]);
    return resultado.affectedRows;
}

