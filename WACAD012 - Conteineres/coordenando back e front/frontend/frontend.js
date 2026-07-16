const http = require('http');
const querystring = require('querystring');

const server = http.createServer((req, res) => {
  if (req.method === 'POST') {
    let body = '';
    req.on('data', chunk => { body += chunk.toString(); });
    req.on('end', () => {
      const postData = querystring.stringify({ mensagem: body });

      const options = {
        hostname: 'backend',
        port: 4000,
        path: '/',
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'Content-Length': Buffer.byteLength(postData)
        }
      };

      const reqBack = http.request(options, (resBack) => {
        res.writeHead(200, { 'Content-Type': 'text/plain' });
        res.end('Mensagem repassada para o backend com sucesso!');
      });

      reqBack.write(postData);
      reqBack.end();
    });
  } else {
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.end(`
      <form method="POST">
        <input type="text" name="texto" placeholder="Digite algo aqui..." />
        <button type="submit">Enviar para o Back</button>
      </form>
    `);
  }
});

server.listen(3000, () => { console.log('Frontend rodando na porta 3000'); });