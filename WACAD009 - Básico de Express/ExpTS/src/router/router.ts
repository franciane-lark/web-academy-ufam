/*import { Router, Request, Response } from 'express';
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

router.get('/hb1', (req: Request, res: Response) => {
  res.render('hb1', { tecnologia: 'HBS' });
});

router.get('/hb2', (req: Request, res: Response) => {
  res.render('hb2', { nome: 'Express' });
});

router.get('/hb3', (req: Request, res: Response) => {
  const listaProfessores = [
    { nome: 'David Fernandes', sala: '1238' },
    { nome: 'Horácio Fernandes', sala: '1226' },
    { nome: 'Edleno Moura', sala: '1236' },
    { nome: 'Elaine Harada', sala: '1231' }
  ];
  res.render('hb3', { professores: listaProfessores });
});

router.get('/hb4', (req: Request, res: Response) => {
  const technologies = [
    { name: 'Express', type: 'Framework', poweredByNodejs: true },
    { name: 'Laravel', type: 'Framework', poweredByNodejs: false },
    { name: 'React', type: 'Library', poweredByNodejs: true },
    { name: 'Handlebars', type: 'Engine View', poweredByNodejs: true },
    { name: 'Django', type: 'Framework', poweredByNodejs: false },
    { name: 'Docker', type: 'Virtualization', poweredByNodejs: false },
    { name: 'Sequelize', type: 'ORM tool', poweredByNodejs: true },
  ];

  res.render('hb4', { technologies });
});

export default router;

*/

import { Router } from 'express';
import { mainController } from '../controllers/main';

const router = Router();

router.get('/', mainController.index);
router.get('/lorem/:paragrafos', mainController.lorem);
router.get('/hb1', mainController.hb1);
router.get('/hb2', mainController.hb2);
router.get('/hb3', mainController.hb3);
router.get('/hb4', mainController.hb4);

router.get('/produto', mainController.produtos);
router.post('/produto/delete/:id', mainController.deleteProduto);

export default router;