/*
const fs = require ("fs") 

console.log(1)

fs.rename("2.txt", "3.txt", (err) => {
    if (err) console.log(err)
        else console.log("Arquivo renomeado")
})

console.log(2)
*/

const http = require("http")
const { url } = require("inspector")

const servidor = http.createServer((req, res) => {
    console.log(register, url)
    res.writeHead(200, {"content-type": "text/html;charset-utf-8"})
    res.write("<h1>Instituto de Computação</h1>")
    res.end()
})
//http://localhost:7777
servidor.listen(7777)


