
//classe referente aos alunos - Alunos estarão alocados em uma turma
class Aluno {
    id: number;
    nomeCompleto: string;
    idade: number;
    altura: number;
    peso: number;

    constructor(id: number, nomeCompleto: string, idade: number, altura: number, peso: number) {
        this.id = id;
        this.nomeCompleto = nomeCompleto;
        this.idade = Number(idade);
        this.altura = Number(altura);
        this.peso = Number(peso);
    }
}


//classe relacionada à turma
class Turma {
    id: number;
    nome: string;
    alunos: Aluno[];

    constructor(id: number, nome: string) {
        this.id = id;
        this.nome = nome;
        this.alunos = [];
    }


    //retorna a quantidade de alunos
    getNumAlunos(): number {
        return this.alunos.length;
    }

    //retorna a media de idade
    getMediaIdade(): string {
        if (this.alunos.length === 0) return "0";
        const soma = this.alunos.reduce((acc, a) => acc + a.idade, 0);
        return (soma / this.alunos.length).toFixed(1);
    }


    //retorna a media de alturas
    getMediaAlturas(): string {
        if (this.alunos.length === 0) return "0";
        const soma = this.alunos.reduce((acc, a) => acc + a.altura, 0);
        return (soma / this.alunos.length).toFixed(2);
    }


    //retorna a media de pesos
    getMediaPesos(): string {
        if (this.alunos.length === 0) return "0";
        const soma = this.alunos.reduce((acc, a) => acc + a.peso, 0);
        return (soma / this.alunos.length).toFixed(1);
    }
}


//instancia uuma turma
const minhaTurma = new Turma(1, "Turma de TypeScript");
let proximoId = 1;


//metodos de suporte ao html
function atualizarInterface(): void {
    // Tipando os elementos para o TypeScript aceitar a manipulação do DOM sem reclamar
    const mediaTotalEl = document.getElementById('media-total');
    const mediaIdadeEl = document.getElementById('media-idade');
    const mediaAlturaEl = document.getElementById('media-altura');
    const mediaPesoEl = document.getElementById('media-peso');
    const listaULEl = document.getElementById('lista-alunos');

    if (mediaTotalEl) mediaTotalEl.innerText = minhaTurma.getNumAlunos().toString();
    if (mediaIdadeEl) mediaIdadeEl.innerText = minhaTurma.getMediaIdade();
    if (mediaAlturaEl) mediaAlturaEl.innerText = minhaTurma.getMediaAlturas() + "m";
    if (mediaPesoEl) mediaPesoEl.innerText = minhaTurma.getMediaPesos() + "kg";

    if (listaULEl) {
        listaULEl.innerHTML = "";
        minhaTurma.alunos.forEach(aluno => {
            const li = document.createElement('li');
            li.innerHTML = `
            <span><strong>${aluno.nomeCompleto}</strong> (${aluno.idade} anos)</span>
            <span style="color: #666;">${aluno.altura}m | ${aluno.peso}kg</span>
            `;
            listaULEl.appendChild(li);
        });
    }
}

// Listener do formulário
const formAluno = document.getElementById('form-aluno') as HTMLFormElement | null;
if (formAluno) {
    formAluno.addEventListener('submit', function(evento: Event) {
        evento.preventDefault();

        const nome = (document.getElementById('nome') as HTMLInputElement).value;
        const idade = (document.getElementById('idade') as HTMLInputElement).value;
        const altura = (document.getElementById('altura') as HTMLInputElement).value;
        const peso = (document.getElementById('peso') as HTMLInputElement).value;

        const novoAluno = new Aluno(proximoId++, nome, Number(idade), Number(altura), Number(peso));
        minhaTurma.alunos.push(novoAluno);

        atualizarInterface();

        formAluno.reset();
                               (document.getElementById('nome') as HTMLInputElement).focus();
    });
}
