import conexao from "../database/conexao.js"

export async function cadastrar(sala) {
    const sql = "INSERT INTO sala (nome, capacidade, localizacao) VALUES (?,?,?)";
    const [resultado] = await conexao.execute(sql, [
        sala.nome,
        sala.capacidade,
        sala.localizacao
    ])

    return resultado.insertId;
}

export async function listar() {
    const sql = "SELECT * FROM sala";
    const [resultado] = await conexao.execute(sql);

    return resultado;
}

export async function buscarPorNome(nome) {
    const sql = "SELECT * FROM sala WHERE nome LIKE = ?";
    const termoBusca = `%${nome}%`
    const [resultado] = await conexao.execute(sql, [termoBusca]);

    return resultado;
}

export async function buscarPorId(id) {
    const sql = "SELECT * FROM sala WHERE id_sala = ?";
    const [resultado] = await conexao.execute(sql, [id]);

    return resultado[0];
}

export async function atualizar(id, sala) {
    const sql = "UPDATE sala SET  nome = ?, capacidade = ?, localizacao = ? WHERE id_sala = ?";
    const [resultado] = await conexao.execute(sql, [
        sala.nome,
        sala.capacidade,
        sala.localizacao,
        id
    ])

    return resultado.affectedRows;
}

export async function deletar(id) {
    const sql = "DELETE FROM sala WHERE id_sala = ?";
    const [resultado] = await conexao.execute(sql, [id]);

    return resultado.affectedRows;
}