const fs = require("fs")
const http = require ("http")

const server = http.createServer((req, res) => {
    fs.readdir(FOLDER, (err, files) => {
        res.writeHead(200, {"content-type": "text/html;charset-utf-8"})
        console.log(files)
        files.forEach( f => res.write( `${f}<br>`))
        res.end()
    })
})

server.listen(8899)


const FOLDER = process.argv[2]
console.log(FOLDER)