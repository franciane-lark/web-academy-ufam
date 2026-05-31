class Product {
    id: number;
    productName: string;
    model: string;
    price: number;
    manufacturer: string;

    constructor(id: number, productName: string, model: string, price: number, manufacturer: string) {
        this.id = id;
        this.productName = productName;
        this.model = model;
        this.price = Number(price);
        this.manufacturer = manufacturer;
    }

    getUnitPrice(): number { 
        return this.price; 
    }

    toString(): string {
        return `[${this.productName}] ${this.manufacturer} - ${this.model}`;
    }
}


class EletronicProduct extends Product {
    screenResolution: string | null;
    screenInches: number | null;
    memory: number | null;

    constructor(
        id: number, 
        productName: string, 
        model: string, 
        price: number, 
        manufacturer: string, 
        screenResolution: string | null, 
        screenInches: number | null, 
        memory: number | null
    ) {
        super(id, productName, model, price, manufacturer);
        this.screenResolution = screenResolution;
        this.screenInches = screenInches;
        this.memory = memory;
    }
}


class Bike extends Product {
    rim: number;

    constructor(id: number, productName: string, model: string, price: number, manufacturer: string, rim: number) {
        super(id, productName, model, price, manufacturer);
        this.rim = rim;
    }
}

class CartProduct {
    product: Product;
    productQuantity: number;
    productPriceTotal: number;

    constructor(product: Product, qt: number) {
        this.product = product;
        this.productQuantity = Number(qt);
        this.productPriceTotal = this.product.getUnitPrice() * this.productQuantity;
    }

    getProductPriceTotal(): number { return this.productPriceTotal; }
    getQuantity(): number { return this.productQuantity; }
    getProduct(): Product { return this.product; }
}

class Cart {
    cartList: CartProduct[];
    purchaseValue: number;

    constructor() {
        this.cartList = [];
        this.purchaseValue = 0.0;
    }

    addProductToCart(cartProduct: CartProduct): void {
        this.cartList.push(cartProduct);
        this.purchaseValue = this.calculatePurchaseValue();
    }

    calculatePurchaseValue(): number {
        return this.cartList.reduce((total, item) => total + item.getProductPriceTotal(), 0);
    }

    getPurchaseValue(): number { return this.purchaseValue; }
    getCartLenght(): number { return this.cartList.length; } 
    getCartProductList(): CartProduct[] { return this.cartList; }
}



const meuCarrinho = new Cart();
let idContador = 1;


function alternarCamposDinamicos(): void {
    const tipoProdutoEl = document.getElementById('tipoProduto') as HTMLSelectElement | null;
    if (!tipoProdutoEl) return;

    const tipoSelecionado = tipoProdutoEl.value;
    
    document.querySelectorAll('.dinamico').forEach(bloco => {
        bloco.classList.remove('active');
    });

    if (tipoSelecionado === 'tv') {
        document.getElementById('blocoTv')?.classList.add('active');
    } else if (tipoSelecionado === 'celular') {
        document.getElementById('blocoCelular')?.classList.add('active');
    } else if (tipoSelecionado === 'bike') {
        document.getElementById('blocoBike')?.classList.add('active');
    }
}

function atualizarPainelDinamico(): void {
    const statItensEl = document.getElementById('statItens');
    const statTotalEl = document.getElementById('statTotal');
    const listaDivEl = document.getElementById('listaItens');

    if (statItensEl) statItensEl.innerText = meuCarrinho.getCartLenght().toString();
    if (statTotalEl) statTotalEl.innerText = meuCarrinho.getPurchaseValue().toFixed(2);

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

function limparFormulario(): void {
    (document.getElementById('modelo') as HTMLInputElement).value = '';
    (document.getElementById('fabricante') as HTMLInputElement).value = '';
    (document.getElementById('preco') as HTMLInputElement).value = '';
    (document.getElementById('quantidade') as HTMLInputElement).value = '1';
    (document.getElementById('resolucao') as HTMLInputElement).value = '';
    (document.getElementById('polegadas') as HTMLInputElement).value = '';
    (document.getElementById('memoria') as HTMLInputElement).value = '';
    (document.getElementById('aro') as HTMLInputElement).value = '';
}

document.addEventListener('DOMContentLoaded', () => {
    const tipoProdutoEl = document.getElementById('tipoProduto');
    tipoProdutoEl?.addEventListener('change', alternarCamposDinamicos);

    const btnAdicionar = document.getElementById('btnAdicionar');
    btnAdicionar?.addEventListener('click', () => {
        const tipo = (document.getElementById('tipoProduto') as HTMLSelectElement).value;
        const modelo = (document.getElementById('modelo') as HTMLInputElement).value || 'Padrão';
        const fabricante = (document.getElementById('fabricante') as HTMLInputElement).value || 'Genérico';
        const preco = parseFloat((document.getElementById('preco') as HTMLInputElement).value) || 0;
        const quantidade = parseInt((document.getElementById('quantidade') as HTMLInputElement).value) || 1;

        let novoProduto: Product;

        if (tipo === 'tv') {
            const resolucao = (document.getElementById('resolucao') as HTMLInputElement).value || 'Não informada';
            const polegadas = parseInt((document.getElementById('polegadas') as HTMLInputElement).value) || 0;
            novoProduto = new EletronicProduct(idContador++, "TV", modelo, preco, fabricante, resolucao, polegadas, null);
        } else if (tipo === 'celular') {
            const memoria = parseInt((document.getElementById('memoria') as HTMLInputElement).value) || 0;
            novoProduto = new EletronicProduct(idContador++, "Celular", modelo, preco, fabricante, null, null, memoria);
        } else { 
            const aro = parseInt((document.getElementById('aro') as HTMLInputElement).value) || 0;
            novoProduto = new Bike(idContador++, "Bicicleta", modelo, preco, fabricante, aro);
        }

        const itemCarrinho = new CartProduct(novoProduto, quantidade);
        meuCarrinho.addProductToCart(itemCarrinho);

        atualizarPainelDinamico();
        limparFormulario();
    });
});

