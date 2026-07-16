const http = require('http');

const server = http.createServer((req, res) => {
  if (req.method === 'POST') {
    let body = '';
    req.on('data', chunk => { body += chunk.toString(); });
    req.on('end', () => {
      console.log(`[BACKEND RECEBEU]: ${decodeURIComponent(body)}`);
      res.writeHead(200, { 'Content-Type': 'text/plain' });
      res.end('OK');
    });
  } else {
    res.writeHead(200);
    res.end('Backend ativo');
  }
});

server.listen(4000, () => { console.log('Backend rodando na porta 4000'); });