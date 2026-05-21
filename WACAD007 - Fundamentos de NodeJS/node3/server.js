import http from 'http';
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PORT = process.env.PORT || 3333;

const loremParagraphs = [
    "Neque augue amet id ut at tristique nec? Est lorem nam congue sollicitudin class tristique himenaeos viverra nascetur ante, nullam sem nisl sagittis arcu sit condimentum. Feugiat class nunc sagittis adipiscing habitant semper ullamcorper rhoncus facilisis eleifend?",
    "Nostra torquent nibh nascetur non varius montes neque dictum conubia fermentum. Sem netus lectus maecenas interdum amet purus dignissim feugiat ullamcorper scelerisque dui adipiscing maecenas, phasellus sed tempus habitant fermentum luctus ridiculus, proin pharetra tempus morbi arcu mus est urna pharetra sem blandit, praesent tempus sociis, pharetra magnis fusce commodo taciti feugiat lectus rhoncus accumsan? Dictumst semper lectus varius dictum magnis phasellus natoque blandit.",
    "Cursus vestibulum urna quis metus leo interdum ante? Tempor habitant facilisi netus penatibus justo praesent, dictumst conubia libero porttitor dis mus torquent platea dapibus nibh montes etiam.",
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
];

const server = http.createServer(async (req, res) => {
    const url = req.url;

    if (url.startsWith('/api/lorem')) {
        const parsedUrl = new URL(url, `http://${req.headers.host}`);
        const qtd = parseInt(parsedUrl.searchParams.get('paragraphs')) || 1;

        let result = [];
        for (let i = 0; i < qtd; i++) {
            result.push(loremParagraphs[i % loremParagraphs.length]);
        }

        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ paragraphs: result }));
        return;
    }

    let filePath = path.join(__dirname, 'public', url === '/' ? 'index.html' : url);
    
    const ext = path.extname(filePath);
    let contentType = 'text/html';

    switch (ext) {
        case '.css':
            contentType = 'text/css';
            break;
        case '.js':
            contentType = 'application/javascript';
            break;
    }

    try {
        const content = await fs.readFile(filePath);
        res.writeHead(200, { 'Content-Type': contentType });
        res.end(content);
    } catch (error) {
        res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
        res.end('Arquivo não encontrado');
    }
});

server.listen(PORT, () => {
    console.log(`Servidor rodando com sucesso em http://localhost:${PORT}`);
});