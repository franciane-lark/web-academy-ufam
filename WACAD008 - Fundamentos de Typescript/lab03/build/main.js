"use strict";
class Product {
    constructor(id, productName, model, price, manufacturer) {
        this.id = id;
        this.productName = productName;
        this.model = model;
        this.price = Number(price);
        this.manufacturer = manufacturer;
    }
    getUnitPrice() {
        return this.price;
    }
    toString() {
        return `[${this.productName}] ${this.manufacturer} - ${this.model}`;
    }
}
class EletronicProduct extends Product {
    constructor(id, productName, model, price, manufacturer, screenResolution, screenInches, memory) {
        super(id, productName, model, price, manufacturer);
        this.screenResolution = screenResolution;
        this.screenInches = screenInches;
        this.memory = memory;
    }
}
class Bike extends Product {
    constructor(id, productName, model, price, manufacturer, rim) {
        super(id, productName, model, price, manufacturer);
        this.rim = rim;
    }
}
class CartProduct {
    constructor(product, qt) {
        this.product = product;
        this.productQuantity = Number(qt);
        this.productPriceTotal = this.product.getUnitPrice() * this.productQuantity;
    }
    getProductPriceTotal() { return this.productPriceTotal; }
    getQuantity() { return this.productQuantity; }
    getProduct() { return this.product; }
}
class Cart {
    constructor() {
        this.cartList = [];
        this.purchaseValue = 0.0;
    }
    addProductToCart(cartProduct) {
        this.cartList.push(cartProduct);
        this.purchaseValue = this.calculatePurchaseValue();
    }
    calculatePurchaseValue() {
        return this.cartList.reduce((total, item) => total + item.getProductPriceTotal(), 0);
    }
    getPurchaseValue() { return this.purchaseValue; }
    getCartLenght() { return this.cartList.length; }
    getCartProductList() { return this.cartList; }
}
// --- SISTEMA EM EXECUÇÃO ---
const meuCarrinho = new Cart();
let idContador = 1;
// Função responsável por alternar as views dos blocos dinâmicos
function alternarCamposDinamicos() {
    var _a, _b, _c;
    const tipoProdutoEl = document.getElementById('tipoProduto');
    if (!tipoProdutoEl)
        return;
    const tipoSelecionado = tipoProdutoEl.value;
    document.querySelectorAll('.dinamico').forEach(bloco => {
        bloco.classList.remove('active');
    });
    if (tipoSelecionado === 'tv') {
        (_a = document.getElementById('blocoTv')) === null || _a === void 0 ? void 0 : _a.classList.add('active');
    }
    else if (tipoSelecionado === 'celular') {
        (_b = document.getElementById('blocoCelular')) === null || _b === void 0 ? void 0 : _b.classList.add('active');
    }
    else if (tipoSelecionado === 'bike') {
        (_c = document.getElementById('blocoBike')) === null || _c === void 0 ? void 0 : _c.classList.add('active');
    }
}
function atualizarPainelDinamico() {
    const statItensEl = document.getElementById('statItens');
    const statTotalEl = document.getElementById('statTotal');
    const listaDivEl = document.getElementById('listaItens');
    if (statItensEl)
        statItensEl.innerText = meuCarrinho.getCartLenght().toString();
    if (statTotalEl)
        statTotalEl.innerText = meuCarrinho.getPurchaseValue().toFixed(2);
    if (listaDivEl) {
        listaDivEl.innerHTML = '';
        meuCarrinho.getCartProductList().forEach(item => {
            const div = document.createElement('div');
            div.className = 'item-carrinho';
            div.innerHTML = `
                <strong>${item.getProduct().toString()}</strong><br>
                ${item.getQuantity()}x Unidades de R$ ${item.getProduct().getUnitPrice().toFixed(2)} 
                | <strong>Subtotal: R$ ${item.getProductPriceTotal().toFixed(2)}</strong>
            `;
            listaDivEl.appendChild(div);
        });
    }
}
function limparFormulario() {
    document.getElementById('modelo').value = '';
    document.getElementById('fabricante').value = '';
    document.getElementById('preco').value = '';
    document.getElementById('quantidade').value = '1';
    document.getElementById('resolucao').value = '';
    document.getElementById('polegadas').value = '';
    document.getElementById('memoria').value = '';
    document.getElementById('aro').value = '';
}
// --- MAPEAMENTO DOS LISTENERS APÓS O CARREGAMENTO DO DOM ---
document.addEventListener('DOMContentLoaded', () => {
    // Escuta a mudança de tipo de produto para alternar os blocos na tela
    const tipoProdutoEl = document.getElementById('tipoProduto');
    tipoProdutoEl === null || tipoProdutoEl === void 0 ? void 0 : tipoProdutoEl.addEventListener('change', alternarCamposDinamicos);
    // Escuta o clique do botão Inserir
    const btnAdicionar = document.getElementById('btnAdicionar');
    btnAdicionar === null || btnAdicionar === void 0 ? void 0 : btnAdicionar.addEventListener('click', () => {
        const tipo = document.getElementById('tipoProduto').value;
        const modelo = document.getElementById('modelo').value || 'Padrão';
        const fabricante = document.getElementById('fabricante').value || 'Genérico';
        const preco = parseFloat(document.getElementById('preco').value) || 0;
        const quantidade = parseInt(document.getElementById('quantidade').value) || 1;
        let novoProduto;
        if (tipo === 'tv') {
            const resolucao = document.getElementById('resolucao').value || 'Não informada';
            const polegadas = parseInt(document.getElementById('polegadas').value) || 0;
            novoProduto = new EletronicProduct(idContador++, "TV", modelo, preco, fabricante, resolucao, polegadas, null);
        }
        else if (tipo === 'celular') {
            const memoria = parseInt(document.getElementById('memoria').value) || 0;
            novoProduto = new EletronicProduct(idContador++, "Celular", modelo, preco, fabricante, null, null, memoria);
        }
        else { // bike
            const aro = parseInt(document.getElementById('aro').value) || 0;
            novoProduto = new Bike(idContador++, "Bicicleta", modelo, preco, fabricante, aro);
        }
        const itemCarrinho = new CartProduct(novoProduto, quantidade);
        meuCarrinho.addProductToCart(itemCarrinho);
        atualizarPainelDinamico();
        limparFormulario();
    });
});
