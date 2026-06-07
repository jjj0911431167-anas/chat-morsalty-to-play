const http = require('http');
const fs = require('fs');

const server = http.createServer((req, res) => {

  if (req.url === '/') {
    res.writeHead(200, {'Content-Type':'application/json'});
    return res.end(JSON.stringify({
      app: 'Chat Morsalty To Play',
      status: 'online'
    }));
  }

  if (req.url === '/users') {

    const users = JSON.parse(
      fs.readFileSync('./backend/database/users.json')
    );

    res.writeHead(200, {'Content-Type':'application/json'});
    return res.end(JSON.stringify(users));
  }

  res.writeHead(404);
  res.end('Not Found');

});

server.listen(3000, () => {
  console.log('Server running on port 3000');
});
