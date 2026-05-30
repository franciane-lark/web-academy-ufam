type LembreteTupla = [
    string,       
    string,       
    Date,         
    Date,      
    Date | null,  
    string | null 
];

type CredenciaisAutenticacao = {
    usuario: string;
    token: string;
};

class GerenciadorLembretes {
    private lembretes: LembreteTupla[] = [];
    private tokenValido = "token-secreto-123";

    private autenticar(auth: CredenciaisAutenticacao | null): void {
        if (!auth || auth.token !== this.tokenValido) {
            throw new Error("Não autenticado!");
        }
    }

    public criar(auth: CredenciaisAutenticacao | null, titulo: string, dataLimite: Date | null, descricao: string | null): LembreteTupla {
        this.autenticar(auth);
        const agora = new Date();
        const novo: LembreteTupla = [
            Math.random().toString(36).substring(2, 9),
            titulo,
            agora,
            agora,
            dataLimite,
            descricao
        ];
        this.lembretes.push(novo);
        return novo;
    }

    public listar(auth: CredenciaisAutenticacao | null): LembreteTupla[] {
        this.autenticar(auth);
        return this.lembretes;
    }

   public editar(
    auth: CredenciaisAutenticacao | null, 
    id: string, 
    novosDados: { titulo: string; dataLimite: Date | null; descricao: string | null }
    ): void {
    this.autenticar(auth);
    
    const index = this.lembretes.findIndex(l => l[0] === id);
    
    if (index !== -1) {
        const lembreteAlvo = this.lembretes[index]; 
       
        if (lembreteAlvo) {
            const [idAt, , insercaoAt] = lembreteAlvo; 
            
            this.lembretes[index] = [
                idAt,
                novosDados.titulo,
                insercaoAt,
                new Date(),
                novosDados.dataLimite,
                novosDados.descricao
            ];
        }
    }
}

    public apagar(auth: CredenciaisAutenticacao | null, id: string): void {
        this.autenticar(auth);
        this.lembretes = this.lembretes.filter(l => l[0] !== id);
    }
}

const app = new GerenciadorLembretes();
let usuarioLogado: CredenciaisAutenticacao | null = null;
let idEmEdicao: string | null = null;

const secaoLogin = document.getElementById("secao-login")!;
const secaoApp = document.getElementById("secao-app")!;
const formLogin = document.getElementById("form-login") as HTMLFormElement;
const formLembrete = document.getElementById("form-lembrete") as HTMLFormElement;
const listaContainer = document.getElementById("lista-lembretes")!;
const nomeUsuarioSpan = document.getElementById("nome-usuario")!;
const btnSair = document.getElementById("btn-sair")!;

const inputTitulo = document.getElementById("titulo") as HTMLInputElement;
const inputDataLimite = document.getElementById("data-limite") as HTMLInputElement;
const inputDescricao = document.getElementById("descricao") as HTMLTextAreaElement;

formLogin.addEventListener("submit", (e) => {
    e.preventDefault();
    const user = (document.getElementById("usuario") as HTMLInputElement).value;
    const senha = (document.getElementById("senha") as HTMLInputElement).value;

    if (user === "admin" && senha === "123") {
        usuarioLogado = { usuario: user, token: "token-secreto-123" };
        nomeUsuarioSpan.textContent = user;
        secaoLogin.classList.add("hidden");
        secaoApp.classList.remove("hidden");
        renderizar();
    } else {
        alert("Usuário ou senha incorretos!");
    }
});

btnSair.addEventListener("click", () => {
    usuarioLogado = null;
    secaoApp.classList.add("hidden");
    secaoLogin.classList.remove("hidden");
    formLogin.reset();
});

formLembrete.addEventListener("submit", (e) => {
    e.preventDefault();
    
    const titulo = inputTitulo.value;
    const dataLimite = inputDataLimite.value ? new Date(inputDataLimite.value) : null;
    const descricao = inputDescricao.value || null;

    if (idEmEdicao) {
        app.editar(usuarioLogado, idEmEdicao, { titulo, dataLimite, descricao });
        idEmEdicao = null;
        formLembrete.querySelector("button")!.textContent = "Salvar Lembrete";
    } else {
        app.criar(usuarioLogado, titulo, dataLimite, descricao);
    }

    formLembrete.reset();
    renderizar();
});

function renderizar() {
    listaContainer.innerHTML = "";
    const lembretes = app.listar(usuarioLogado);

    lembretes.forEach((lembrete) => {
        const [id, titulo, insercao, alteracao, limite, descricao] = lembrete;

        const card = document.createElement("div");
        card.className = "card";

        const txtInsercao = insercao.toLocaleDateString() + " às " + insercao.toLocaleTimeString();
        const txtAlteracao = alteracao.toLocaleDateString() + " às " + alteracao.toLocaleTimeString();
        const txtLimite = limite ? new Date(limite).toLocaleDateString() : "Não definida";
        
        const ISOlimite = limite ? new Date(limite).toISOString().split('T')[0] : '';

        const descSegura = descricao ? descricao.replace(/'/g, "\\'") : '';
        const tituloSeguro = titulo.replace(/'/g, "\\'");

        card.innerHTML = `
            <span class="danger" style="color: red; cursor: pointer; float: right;" onclick="deletarLembrete('${id}')">Apagar</span>
            <span class="edit" style="color: blue; cursor: pointer; float: right; margin-right: 15px;" onclick="prepararEdicao('${id}', '${tituloSeguro}', '${ISOlimite}', '${descSegura}')">✏️ Editar</span>
            <h4>${titulo}</h4>
            <p><small>Criado em: ${txtInsercao}</small></p>
            <p><small>Modificado em: ${txtAlteracao}</small></p>
            <p><strong>Prazo final:</strong> ${txtLimite}</p>
            <p>${descricao ? `<em>${descricao}</em>` : "<em>Sem descrição</em>"}</p>
        `;
        listaContainer.appendChild(card);
    });
}

(window as any).deletarLembrete = (id: string) => {
    app.apagar(usuarioLogado, id);
    renderizar();
};

(window as any).prepararEdicao = (id: string, titulo: string, limite: string, descricao: string) => {
    idEmEdicao = id;
    inputTitulo.value = titulo;
    inputDataLimite.value = limite;
    inputDescricao.value = descricao;
    formLembrete.querySelector("button")!.textContent = "Atualizar Lembrete";
    inputTitulo.focus();
};