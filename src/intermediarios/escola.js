
// intermediário responsável por autenticar o professor caso ele deseje excluir um cadastro de professor.
const autenticacaoProfessor = (requisicao, resposta, next) => {
    const senha = requisicao.query.senha

    if (!senha) {
        return resposta.json({ mensagem: 'Senha obrigatória para esta operação!' });
    } else if (senha !== '123') {
        return resposta.json({ mensagem: 'Senha de usuário incorreta.' });
    } else {
        next();
    }

}


// intermediário responsável por autenticar o aluno caso ele deseje excluir uma de suas aulas.
const autenticarAluno = (requisicao, resposta, next) => {
    const senha = requisicao.query.senha

    if (!senha) {
        return resposta.json({ mensagem: 'Senha obrigatória para esta operação!' });
    } else if (senha !== '123') {
        return resposta.json({ mensagem: 'Senha de usuário incorreta.' });
    } else {
        next();
    }

}

module.exports = {
    autenticacaoProfessor,
    autenticarAluno
}