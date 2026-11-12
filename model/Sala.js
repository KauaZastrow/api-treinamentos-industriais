export class Sala {

    constructor(nome, capacidade, localizacao) {
        this.nome = nome;
        this.capacidade = capacidade;
        this.localizacao = localizacao;
    }

    validar() {
        if (!this.nome || this.nome.trim().length < 2) {
            throw new Error('O nome da sala deve ter pelo menos 3 caracteres.');
        }

        if (!this.capacidade || isNaN(this.capacidade) || this.capacidade <= 0 || !Number.isInteger(this.capacidade)) {
            throw new Error('A capacidade da sala deve ser um número inteiro maior que zero.');
        }

        if (!this.localizacao || this.localizacao.trim().length < 3) {
            throw new Error('A localização da sala é obrigatória.');
        }
    }
}