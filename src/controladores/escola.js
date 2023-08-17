let { dados, identificadorPessoa, identificadorAula } = require('../../bancodedados/dados');

// funções para tratativas dos dados de professores.


// função para listar professor.
const listarProfessores = (requisicao, resposta) => {
    const encontraProfessores = dados.filter((professor) => {
        return professor.cargo === 'professor';
    });

    // tratativa caso não seja encontrado nenhum professor no array
    if (!encontraProfessores) {
        resposta.status(404).json({ mensagem: 'Não foram encontrados professores na base de dados.' });
    }

    // exibição do array de professores
    return resposta.status(200).json(encontraProfessores)

}

// função para cadastrar professor.
const cadastrarProfessores = (requisicao, resposta) => {
    const { nome, email } = requisicao.body;

    const professor = {
        id: identificadorPessoa++,
        nome,
        email,
        cargo: 'professor'
    }

    dados.push(professor)
    console.log(identificadorPessoa)

    return resposta.status(203).json({ mensagem: 'Professor(a) cadastrado(a).' })

}


// função para alterar dados de um professor pelo ID.
const alterarDadoCadastralProfessor = (requisicao, resposta) => {
    const { nome, email } = requisicao.body;
    const id = requisicao.params.id;

    if (!nome || !email) {
        return resposta.status(203).json({ mensagem: 'É obrigatório informar nome e e-mail.' });
    }

    const encontraProfessores = dados.filter((professor) => {
        return professor.cargo === 'professor';
    });

    let professor = encontraProfessores.find((professor) => {
        return professor.id === Number(id);
    });

    professor.nome = nome;
    professor.email = email;

    return resposta.json({ mensagem: 'Dado cadastral atualizado com sucesso!' });

}

// função para deletar cadastro de professor pelo ID.
const excluirCadastroProfessor = (requisicao, resposta) => {
    const id = requisicao.params.id;

    const encontraProfessores = dados.filter((professor) => {
        return professor.cargo === 'professor';
    });

    if (!encontraProfessores) {
        return resposta.status(404).json({ mensagem: 'O ID informado não corresponde a um professor.' })
    } else {
        dados = encontraProfessores.filter((professor) => {
            return professor.id !== Number(id);
        });

        return resposta.json({ mensagem: 'Professor(a) excluido(a) com sucesso.' })
    }

}


// funções para tratativas dos dados de alunos


// função para cadastrar aula para aluno.
const cadastrarAula = (requisicao, resposta) => {
    const id = requisicao.params.id
    const { nome, vista } = requisicao.body;

    const alunos = dados.filter((aluno) => {
        return aluno.cargo === 'aluno';
    });

    if (!alunos) {
        return resposta.status(404).json({ mensagem: 'Não foram encontrados alunos na base de dados.' })
    }

    const aluno = alunos.find((aluno) => {
        return aluno.id === Number(id);
    });

    if (!aluno) {
        return resposta.status(404).json({ mensagem: 'ID de aluno não identificado.' });
    } else {

        let ultimaAulaDoAluno = aluno.aulas.length;

        aluno.aulas.push(
            {
                id: ++ultimaAulaDoAluno,
                nome,
                vista,
            }
        )

        return resposta.json(aluno)
    }
}

// função para listar as aulas de um aluno, de acordo com o ID do aluno informado na requisição.
const listarAulasAluno = (requisicao, resposta) => {
    const id = requisicao.params.id;

    const alunos = dados.filter((aluno) => {
        return dados.cargo === 'aluno';
    });

    if (!alunos) {
        resposta.status(404).json({ mensagem: 'Não foram encontrados alunos na base de dados.' })
    }

    const aluno = dados.find((aluno) => {
        return aluno.id === Number(id);
    });

    if (!aluno) {
        resposta.status(404).json({ mensagem: 'Não foi encontrado nenhum aluno com o ID informado.' })
    }

    resposta.status(200).json(aluno.aulas)





}

// função para criar uma descrição para uma aula, encontrada pelo ID da aula de um aluno encontrado pela ID.
const detalharAulaAluno = (requisicao, resposta) => {
    const { id, idAula } = requisicao.params;
    const { detalhesAula } = requisicao.body;

    const alunos = dados.filter((aluno) => {
        return aluno.cargo === 'aluno';
    });

    const aluno = alunos.find((aluno) => {
        return aluno.id === Number(id);
    });

    if (!aluno) {
        resposta.status(404).json({ mensagem: 'Não foi encontrado nenhum aluno com o ID informado.' })
    }

    if (!aluno.aulas[idAula - 1]) {
        resposta.status(404).json({ mensagem: 'Não foi encontrada nenhuma aula para este aluno com o ID informado.' })
    } else {
        aluno.aulas[idAula - 1] = {
            id: Number(idAula),
            nome: aluno.aulas[idAula - 1].nome,
            vista: aluno.aulas[idAula - 1].vista,
            descricao: detalhesAula
        }
    }



    resposta.status(203).json({ mensagem: 'Criada a descrição da aula com sucesso!' });

}

// função para deletar uma aula, encontrada pelo ID da aula de um aluno encontrado pelo ID.
const deletarAulaAluno = (requisicao, resposta, next) => {
    const { id, idAula } = requisicao.params;

    const alunos = dados.filter((aluno) => {
        return aluno.cargo === 'aluno';
    });

    if (!alunos) {
        resposta.status(404).json({ mensagem: 'Não foram encontrados alunos na base de dados' });
    }

    let aluno = alunos.find((aluno) => {
        return aluno.id === Number(id)
    })

    aluno.aulas = aluno.aulas.filter((aula) => {
        return aula.id !== Number(idAula);
    });

    resposta.status(203).json({ mensagem: 'Aula excluida com sucesso.' })
}

module.exports = {
    listarProfessores,
    cadastrarProfessores,
    excluirCadastroProfessor,
    alterarDadoCadastralProfessor,
    cadastrarAula,
    listarAulasAluno,
    detalharAulaAluno,
    deletarAulaAluno
}