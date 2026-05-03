
//acessando a pagina html
const displayedImage = document.querySelector('.displayed-img');
const imageText = document.querySelector('.image-text'); // Novo elemento para o texto
const thumbBar = document.querySelector('.thumb-bar');
const btnNext = document.querySelector('.next-btn'); // Botão de próximo
const btnDark = document.querySelector('.dark'); // Botão de escurecer
const overlay = document.querySelector('.overlay');

/* Declarando um array de dicionario para imagens e texto */
const images = [
    { id: 1, imgPath: './images/gato1.webp', text: "Meow meow" },
    { id: 2, imgPath: './images/gato2.jpg', text: "Meeeeeoooow" },
    { id: 3, imgPath: './images/gato3.webp', text: "Atirei o pau no gato, mas o gato fugiu" },
    { id: 4, imgPath: './images/gato4.jpg', text: "estou com fome, humano insolente" },
    { id: 5, imgPath: './images/gato5.webp', text: "Era isso ou as ruas" }
];


// Variavel para controlar qual imagem está aparecendo
let currentIndex = 0;

// Função para atualizar a imagem e o texto na tela
function updateGallery(index) {
    displayedImage.setAttribute('src', images[index].imgPath);
    imageText.textContent = images[index].text;
}

//chamando a updateGallery para mostrar os dados da primeira posicao
updateGallery(currentIndex)

// Logica do botao proximo
btnNext.addEventListener('click', () => {
    currentIndex++;
    if (currentIndex >= images.length) {
        currentIndex = 0; 
    }
    updateGallery(currentIndex);
});


const newImage = document.createElement('img');
newImage.setAttribute('src', xxx);
newImage.setAttribute('alt', xxx);
thumbBar.appendChild(newImage);

/* Wiring up the Darken/Lighten button */
