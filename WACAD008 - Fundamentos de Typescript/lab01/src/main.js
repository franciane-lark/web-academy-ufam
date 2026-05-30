"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class GerenciadorLembretes {
    lembretes = [];
    tokenValido = "token-secreto-123";
    autenticar(auth) {
        if (!auth || auth.token !== this.tokenValido) {
            throw new Error("Não autenticado!");
        }
    }
    criar(auth, titulo, dataLimite, descricao) {
        this.autenticar(auth);
        const agora = new Date();
        const novo = [
            Math.random().toString(36).substring(2, 9),
            titulo,
            agora,
            agora,
            dataLimite || null,
            descricao || null
        ];
        this.lembretes.push(novo);
        return novo;
    }
    listar(auth) {
        this.autenticar(auth);
        return this.lembretes;
    }
    editar(auth, id, novosDados) {
        this.autenticar(auth);
        const index = this.lembretes.findIndex(l => l[0] === id);
        if (index !== -1) {
            const [idAt, , insercaoAt] = this.lembretes[index];
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
    apagar(auth, id) {
        this.autenticar(auth);
        this.lembretes = this.lembretes.filter(l => l[0] !== id);
    }
}
const app = new GerenciadorLembretes();
let usuarioLogado = null;
let idEmEdicao = null; // Controla se estamos editando ou criando
const secaoLogin = document.getElementById("secao-login");
const secaoApp = document.getElementById("secao-app");
const formLogin = document.getElementById("form-login");
const formLembrete = document.getElementById("form-lembrete");
const listaContainer = document.getElementById("lista-lembretes");
const nomeUsuarioSpan = document.getElementById("nome-usuario");
const btnSair = document.getElementById("btn-sair");
const inputTitulo = document.getElementById("titulo");
const inputDataLimite = document.getElementById("data-limite");
const inputDescricao = document.getElementById("descricao");
formLogin.addEventListener("submit", (e) => {
    e.preventDefault();
    const user = document.getElementById("usuario").value;
    const senha = document.getElementById("senha").value;
    if (user === "admin" && senha === "123") {
        usuarioLogado = { usuario: user, token: "token-secreto-123" };
        nomeUsuarioSpan.textContent = user;
        secaoLogin.classList.add("hidden");
        secaoApp.classList.remove("hidden");
        renderizar();
    }
    else {
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
        formLembrete.querySelector("button").textContent = "Salvar Lembrete";
    }
    else {
        app.criar(usuarioLogado, titulo, dataLimite || undefined, descricao || undefined);
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
        card.innerHTML = `
            <span class="danger" onclick="deletarLembrete('${id}')"> Apagar</span>
            <span class="edit" onclick="prepararEdicao('${id}', '${titulo}', '${limite ? inputDataLimite.value : ''}', '${descricao || ''}')"> Editar</span>
            <h4>${titulo}</h4>
            <p><small>Criado em: ${txtInsercao}</small></p>
            <p><small>Modificado em: ${txtAlteracao}</small></p>
            <p><strong>Prazo final:</strong> ${txtLimite}</p>
            <p>${descricao ? `<em>${descricao}</em>` : "<em>Sem descrição</em>"}</p>
        `;
        listaContainer.appendChild(card);
    });
}
window.deletarLembrete = (id) => {
    app.apagar(usuarioLogado, id);
    renderizar();
};
window.prepararEdicao = (id, titulo, limite, descricao) => {
    idEmEdicao = id;
    inputTitulo.value = titulo;
    inputDataLimite.value = limite;
    inputDescricao.value = descricao;
    formLembrete.querySelector("button").textContent = "Atualizar Lembrete";
    inputTitulo.focus();
};
//# sourceMappingURL=main.js.map