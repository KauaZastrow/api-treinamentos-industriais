export class Instrutor {

    constructor(nome, especialidade, email) {
        this.nome = nome;
        this.especialidade = especialidade;
        this.email = email;
    }

    validar() {
        if (!this.nome || this.nome.trim().length < 3) {
            throw new Error('O nome do instrutor deve ter pelo menos 3 caracteres.');
        }

        if (!this.especialidade || !this.especialidade.trim()) {
            throw new Error('A especialidade do instrutor é obrigatória.');
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!this.email || !emailRegex.test(this.email.trim())) {
            throw new Error('O email do instrutor precisa estar em um formato válido.');
        }
    }
}
