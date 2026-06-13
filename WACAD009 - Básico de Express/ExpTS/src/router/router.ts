import { Router, Request, Response } from 'express';
import { LoremIpsum } from 'lorem-ipsum';

const router = Router();

const lorem = new LoremIpsum({
  sentencesPerParagraph: {
    max: 8,
    min: 4
  },
  wordsPerSentence: {
    max: 16,
    min: 4
  }
});

router.get('/', (req: Request, res: Response) => {
  res.send('Hello World!');
});

router.get('/lorem/:paragrafos', (req: Request, res: Response) => {
  
const quantidadeParagrafos = parseInt(String(req.params.paragrafos), 10);


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

export default router;