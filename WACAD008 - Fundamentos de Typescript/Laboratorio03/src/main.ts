import { GerenciadorLembretes } from './gerenciador';
import { Lembrete } from './types';

const App = new GerenciadorLembretes();

console.log("=== 📝 Criando Lembretes ===");
// Criando lembrete completo
const l1 = App.criar(
    "Estudar TypeScript", 
    new Date("2026-06-01"), 
    "Focar em Generics e Tuplas"
);

// Criando lembrete apenas com campos obrigatórios
const l2 = App.criar("Comprar café");

console.log("Lembretes criados com sucesso!\n");

// Função auxiliar para exibir a tupla formatada
function exibirLembretes(lista: Lembrete[]) {
    if (lista.length === 0) {
        console.log("Nenhum lembrete encontrado.");
        return;
    }
    lista.forEach(([id, titulo, insercao, limite, descricao]) => {
        console.log(`📌 [ID: ${id}] ${titulo}`);
        console.log(`   Criado em: ${insercao.toLocaleString()}`);
        console.log(`   Prazo: ${limite ? limite.toLocaleDateString() : 'Não definido'}`);
        console.log(`   Descrição: ${descricao || 'Sem descrição'}`);
        console.log("-" * 30);
    });
}

console.log("=== 📋 Listando Lembretes ===");
exibirLembretes(App.listar());

console.log("\n=== ✏️ Editando o Primeiro Lembrete ===");
const idParaEditar = l1[0]; // Acessando o ID (posição 0 da tupla)
App.editar(idParaEditar, { 
    titulo: "Estudar TypeScript Avançado", 
    descricao: "Revisar também a implementação de Tuplas" 
});
exibirLembretes(App.listar());

console.log("\n=== ❌ Apagando o Segundo Lembrete ===");
const idParaApagar = l2[0];
App.apagar(idParaApagar);
exibirLembretes(App.listar());