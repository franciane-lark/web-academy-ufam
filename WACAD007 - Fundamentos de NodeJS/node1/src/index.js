const path = require('path')

const envFile = process.env.NODE_ENV === 'production' 
    ? '.env.production' 
    : '.env.development'

require('dotenv').config({ path: path.resolve(process.cwd(), envFile) })

const fs = require("fs")
const http = require("http")

const PORT = process.env.PORT || 3000 
const FOLDER = process.argv[2] 
   

const server = http.createServer((req, res) => {
    if (req.url === '/favicon.ico') {
        res.writeHead(204)
        return res.end()
    }
    if (!FOLDER) {
        res.writeHead(400, {"content-type": "text/plain;charset=utf-8"})
        return res.end("Instituto de Computação")
    }

    fs.readdir(FOLDER, (err, files) => {
        if (err) {
            res.writeHead(500, {"content-type": "text/plain;charset=utf-8"})
            return res.end(`Erro ao ler o diretório: ${err.message}`)
        }

        res.writeHead(200, {"content-type": "text/html;charset=utf-8"})
        
        if (files.length === 0) {
            return res.end("<h3>O diretório está vazio.</h3>")
        }

        const htmlResponse = files.map(f => `<li>${f}</li>`).join("")
        
        res.write(`<h2>Arquivos em: ${FOLDER}</h2>`)
        res.write(`<ul>${htmlResponse}</ul>`)
        res.end()
    })
})

server.listen(PORT, () => {
    console.log(` Servidor rodando em http://localhost:${PORT}`)
    console.log(` Lendo o diretório: ${FOLDER || 'Nenhum informado'}`)
})