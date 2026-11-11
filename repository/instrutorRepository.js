import conexao from "../database/conexao.js"

export async function cadastrar(instrutor) {
    const sql = "INSERT INTO instrutor (nome, especialidade, email) VALUES (?,?,?)";
    const [resultado] = await conexao.execute(sql, [
        instrutor.nome,
        instrutor.especialidade,
        instrutor.email
    ])

    return resultado.insertId;
}

export async function listar() {
    const sql = "SELECT * FROM instrutor";
    const [resultado] = await conexao.execute(sql);

    return resultado;
}

export async function buscarPorNome(nome) {
    const sql = "SELECT * FROM instrutor WHERE LIKE = ?";
    const termoBusca = `%${nome}%`
    const [resultado] = await conexao.execute(sql, [termoBusca]);

    return resultado;
}

export async function buscarPorId(id) {
    const sql = "SELECT * FROM instrutor WHERE id_instrutor = ?";
    const [resultado] = await conexao.execute(sql, [id]);

    return resultado[0];
}

export async function atualizar(id, instrutor) {
    const sql = "UPDATE instrutor SET  nome = ?, especialidade = ?, email = ? WHERE id_instrutor = ?";
    const [resultado] = await conexao.execute(sql, [
        instrutor.nome,
        instrutor.especialidade,
        instrutor.email,
        id
    ])

    return resultado.affectedRows;
}

export async function deletar(id) {
    const sql = "DELETE FROM instrutor WHERE id_instrutor = ?";
    const [resultado] = await conexao.execute(sql, [id]);

    return resultado.affectedRows;
}