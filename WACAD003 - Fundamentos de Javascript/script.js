/*
 * Gerador de frases aleatorias 
 * */



const fs = require('fs')


//le o arquivo de frases e cria uma lista com as frases do arquivo (cada nova linha e uma frase nova)
const content = fs.readFileSync('frases.txt','utf-8')
const lines = content.split(/\r?\n/)


//gera um index randomico, que sera usado para pegar uma frase aleatoriamente
const randomIndex = Math.floor(Math.random()*lines.length)

//pega uma frase ramdomica, usando o indice criado de forma randomica com base na lista de frases
//lidas do arquivo
const randomPhrase = lines[randomIndex]


//imprime a frase randomica na tela
console.log(randomPhrase)





//mostra todo o arquvio de frases, linha por linha
//lines.forEach(line => console.log(line))
