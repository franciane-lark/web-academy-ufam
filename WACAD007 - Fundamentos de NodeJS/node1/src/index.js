const path = require('path');

const { createLink } = require('./utils/links'); 

const envFile = process.env.NODE_ENV === 'production' 
    ? '.env.production' 
    : '.env.development';

require('dotenv').config({ path: path.resolve(process.cwd(), envFile) });

const fs = require("fs");
const http = require("http");


const PORT = process.env.PORT || 3050;
const FOLDER = process.argv[2]; 


const server = http.createServer((req, res) => {
    if (req.url === '/favicon.ico') {
        res.writeHead(204);
        return res.end();
    }
    
    if (!FOLDER) {
        res.writeHead(400, {"content-type": "text/plain;charset=utf-8"});
        return res.end("Instituto de Computação");
    }

    if (req.url === '/') {
        fs.readdir(FOLDER, (err, files) => {
            if (err) {
                res.writeHead(500, {"content-type": "text/plain;charset=utf-8"});
                return res.end(`Erro ao ler o diretório: ${err.message}`);
            }

            res.writeHead(200, {"content-type": "text/html;charset=utf-8"});
            
            if (files.length === 0) {
                return res.end("<h3>O diretório está vazio.</h3>");
            }

            const htmlResponse = files.map(f => createLink(f)).join("");
            return res.end(htmlResponse);
        });
    } 
    else {
        const filePath = path.join(FOLDER, req.url);

        fs.readFile(filePath, "utf-8", (err, data) => {
            if (err) {
                // Se o arquivo não existir ou não puder ser lido
                res.writeHead(404, {"content-type": "text/html;charset=utf-8"});
                return res.end(`<h3>Arquivo não encontrado</h3><br><a href="/">Voltar</a>`);
            }

            res.writeHead(200, {"content-type": "text/html;charset=utf-8"});
   
            const formattedContent = data.replace(/\n/g, "<br>");
            
            res.write(`${formattedContent}<br><br>`);
            res.write(`<a href="/">Voltar</a>`);
            return res.end();
        });
    }
});

server.listen(PORT, () => {
    console.log(` Servidor rodando em http://localhost:${PORT}`);
    console.log(` Servindo arquivos do diretório: ${FOLDER || 'Nenhum informado'}`);
});