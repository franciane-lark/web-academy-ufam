
/*
 * ============== CLASSES RELACIONADAS A PRODUTOS ======================
* */

// Classe Pai de Produtos - Esta classe apresenta todos os atributos comuns relacionados 
// a todos os produtos 
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



// Classe especializada de Produtos Eletronicos. Esta classe herda de Product, logo além de ter 
// os atributos próprios relacionados a produtos eletrônicos, ela herdará os atributos da classe pai Produtos
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


// Classe Bike, herdada de Produtos.
class Bike extends Product {
    rim: number;

    constructor(id: number, productName: string, model: string, price: number, manufacturer: string, rim: number) {
        super(id, productName, model, price, manufacturer);
        this.rim = rim;
    }
}


/*
 * ============= CLASSES RELACIONADAS AO CARRINHO ===================
* */


//classe de Produto do Carrinho - É uma classe de suporte, na qual terá um produto em si, sua a quantidade 
//daquele produto que está sendo comprada e também será responsável por fornecer o valor daquele produto que está no carrinho
//(o valor aqui é calculado pelo preço unitário do produto X a quantidade daquele produto posta no carrinho)
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



// classe de Carrinho, responsável por gerenciar o carrinho como um todo. 
// Esta classe trabalha em conjunto com a classe CartProduct, que irá prover a informação importante 
// do valor pela quantidade de determinado produto posto no carrinho. 
class Cart {
    cartList: CartProduct[];
    purchaseValue: number;

    constructor() {
        this.cartList = [];
        this.purchaseValue = 0.0;
    }

    //adiciona novo produto ao carrinho
    addProductToCart(cartProduct: CartProduct): void {
        this.cartList.push(cartProduct);
        this.purchaseValue = this.calculatePurchaseValue();
    }

    //calcula o preço total do carrinho de compras 
    calculatePurchaseValue(): number {
        return this.cartList.reduce((total, item) => total + item.getProductPriceTotal(), 0);
    }

    getPurchaseValue(): number { return this.purchaseValue; } // retorna o valor total da compra de compras
    getCartLenght(): number { return this.cartList.length; } // retorna a quantidade de itens do carrinho de compras
    getCartProductList(): CartProduct[] { return this.cartList; } // retorna a lista de CartProducts 
}






// --- SISTEMA EM EXECUÇÃO ---
//criamos um carrinho aqui
const meuCarrinho = new Cart();
let idContador = 1;





// Função responsável por alternar as views dos blocos dinâmicos
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

// --- MAPEAMENTO DOS LISTENERS APÓS O CARREGAMENTO DO DOM ---
document.addEventListener('DOMContentLoaded', () => {
    // Escuta a mudança de tipo de produto para alternar os blocos na tela
    const tipoProdutoEl = document.getElementById('tipoProduto');
    tipoProdutoEl?.addEventListener('change', alternarCamposDinamicos);

    // Escuta o clique do botão Inserir
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
        } else { // bike
            const aro = parseInt((document.getElementById('aro') as HTMLInputElement).value) || 0;
            novoProduto = new Bike(idContador++, "Bicicleta", modelo, preco, fabricante, aro);
        }

        const itemCarrinho = new CartProduct(novoProduto, quantidade);
        meuCarrinho.addProductToCart(itemCarrinho);

        atualizarPainelDinamico();
        limparFormulario();
    });
});

