

const displayedImage = document.querySelector('.displayed-img');
const imageText = document.querySelector('.image-text'); 
const thumbBar = document.querySelector('.thumb-bar');
const btnNext = document.querySelector('.next-btn');
const btnDark = document.querySelector('.dark'); 
const overlay = document.querySelector('.overlay');

const images = [
    { id: 1, imgPath: './images/gato1.webp', text: "Meow meow" },
    { id: 2, imgPath: './images/gato2.jpg', text: "Meeeeeoooow" },
    { id: 3, imgPath: './images/gato3.webp', text: "Atirei o pau no gato, mas o gato fugiu" },
    { id: 4, imgPath: './images/gato4.jpg', text: "estou com fome, humano insolente" },
    { id: 5, imgPath: './images/gato5.webp', text: "Era isso ou as ruas" }
];


let currentIndex = 0;

function updateGallery(index) {
    displayedImage.setAttribute('src', images[index].imgPath);
    imageText.textContent = images[index].text;
}
updateGallery(currentIndex)

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

