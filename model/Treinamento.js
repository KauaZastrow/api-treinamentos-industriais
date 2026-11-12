export class Treinamento {

    constructor(nome, carga_horaria, modalidade) {
        this.nome = nome;
        this.carga_horaria = carga_horaria;
        this.modalidade = modalidade;
    }

    validar() {
        if (!this.nome || this.nome.trim().length < 3) {
            throw new Error('O nome do treinamento deve ter pelo menos 3 caracteres.');
        }

        if (!this.carga_horaria || isNaN(this.carga_horaria) || this.carga_horaria <= 0 || !Number.isInteger(this.carga_horaria)) {
            throw new Error('A carga horária do treinamento deve ser um número inteiro maior que zero.');
        }

        if (this.modalidade === undefined) {
            throw new Error('A modalidade do treinamento é obrigatória.');
        }
    }
}