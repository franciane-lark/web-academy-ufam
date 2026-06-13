"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const lorem_ipsum_1 = require("lorem-ipsum");
const router = (0, express_1.Router)();
const lorem = new lorem_ipsum_1.LoremIpsum({
    sentencesPerParagraph: {
        max: 8,
        min: 4
    },
    wordsPerSentence: {
        max: 16,
        min: 4
    }
});
router.get('/', (req, res) => {
    res.send('Hello World!');
});
router.get('/lorem/:paragrafos', (req, res) => {
    const quantidadeParagrafos = parseInt(req.params.paragrafos, 10);
    if (isNaN(quantidadeParagrafos) || quantidadeParagrafos <= 0) {
        res.status(400).send('Por favor, informe um número válido de parágrafos. Ex: /lorem/4');
        return;
    }
    const paragrafosGerados = lorem.generateParagraphs(quantidadeParagrafos);
    const htmlFormatado = paragrafosGerados
        .split('\n')
        .map(paragrafo => `<p>${paragrafo}</p>`)
        .join('');
    res.send(htmlFormatado);
});
exports.default = router;
