const http = require('http');
const fs = require('fs');

function readJSON(path) {
  return JSON.parse(fs.readFileSync(path, 'utf8'));
}

function writeJSON(path, data) {
  fs.writeFileSync(path, JSON.stringify(data, null, 2));
}

const server = http.createServer((req, res) => {

  if (req.method === 'GET' && req.url === '/') {
    res.writeHead(200, {'Content-Type':'application/json'});
    return res.end(JSON.stringify({
      app: 'Chat Morsalty To Play',
      status: 'online'
    }));
  }

  if (req.method === 'GET' && req.url === '/users') {
    const users = readJSON('./backend/database/users.json');

    res.writeHead(200, {'Content-Type':'application/json'});
    return res.end(JSON.stringify(users));
  }

  if (req.method === 'POST' && req.url === '/auth/register') {

    let body = '';

    req.on('data', chunk => {
      body += chunk.toString();
    });

    req.on('end', () => {

      const data = JSON.parse(body);

      const usersDB = readJSON('./backend/database/users.json');

      const newUser = {
        id: Date.now().toString(),
        phone: data.phone,
        username: data.username,
        displayName: data.username,
        verified: false,
        createdAt: new Date().toISOString()
      };

      usersDB.users.push(newUser);

      writeJSON('./backend/database/users.json', usersDB);

      res.writeHead(200, {'Content-Type':'application/json'});
      res.end(JSON.stringify({
        success: true,
        user: newUser
      }));

    });

    return;
  }

  res.writeHead(404);
  res.end('Not Found');

});

server.listen(3000, () => {
  console.log('Server running on port 3000');
});
