import path from 'path'
import dotenv from 'dotenv'
import fs from 'fs'
import http from 'http'

const envFile =
    process.env.NODE_ENV === 'production'
        ? '.env.production'
        : '.env.development'

dotenv.config({
    path: path.resolve(process.cwd(), envFile)
})

const PORT = process.env.PORT || 3000
const FOLDER = process.argv[2]

const server = http.createServer((req, res) => {

    if (req.url === '/favicon.ico') {
        res.writeHead(204)
        return res.end()
    }

    if (!FOLDER) {
        res.writeHead(400, {
            "content-type": "text/plain;charset=utf-8"
        })

        return res.end("Instituto de Computação")
    }

    fs.readdir(FOLDER, (err, files) => {

        if (err) {
            res.writeHead(500, {
                "content-type": "text/plain;charset=utf-8"
            })

            return res.end(`Erro ao ler diretório: ${err.message}`)
        }

        const htmlResponse = files
            .map(f => `<li>${f}</li>`)
            .join("")

        res.writeHead(200, {
            "content-type": "text/html;charset=utf-8"
        })

        res.end(`
            <h2>Arquivos em: ${FOLDER}</h2>
            <ul>${htmlResponse}</ul>
        `)
    })
})

server.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`)
})
