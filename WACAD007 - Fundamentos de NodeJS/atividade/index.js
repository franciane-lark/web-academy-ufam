require('dotenv').config() // Carrega as variáveis do .env
const fs = require("fs")
const http = require("http")

const PORT = process.env.PORT || 3000
const FOLDER = process.argv[2]

const server = http.createServer((req, res) => {
    if (!FOLDER) {
        res.writeHead(400, {"content-type": "text/plain;charset=utf-8"})
        return res.end("Erro: Informe o diretório nos argumentos do processo.")
    }

    fs.readdir(FOLDER, (err, files) => {
        if (err) {
            res.writeHead(500, {"content-type": "text/plain;charset=utf-8"})
            return res.end("Erro ao ler o diretório.")
        }

        res.writeHead(200, {"content-type": "text/html;charset=utf-8"})
        console.log(files)
        files.forEach(f => res.write(`${f}<br>`))
        res.end()
    })
})

server.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`)
    console.log(`Lendo o diretório: ${FOLDER}`)
})