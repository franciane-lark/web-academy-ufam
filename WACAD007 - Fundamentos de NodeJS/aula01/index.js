/*
const FOLDER = process.argv[2]
console.log(FOLDER)

const http = require('http');
require('dotenv').config();
const PORT = process.env.PORT ?? 3333;
const server = http.createServer(function (req, res) {
 res.writeHead(200,{"Content-Type":"text/html;charset=utf-8"});
 res.write("Instituto de Computação");
 res.end();
});
server.listen(PORT);

--------------------------------------------------------------------
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

------------------------------------------------------------------
const fs = require ("fs") 

console.log(1)

fs.rename("2.txt", "3.txt", (err) => {
    if (err) console.log(err)
        else console.log("Arquivo renomeado")
})

console.log(2)
*/
