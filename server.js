const http = require('http');

const server = http.createServer((req, res) => {
  res.writeHead(200, {'Content-Type':'application/json'});
  res.end(JSON.stringify({
    status: "online",
    app: "Chat Morsalty To Play"
  }));
});

server.listen(3000, () => {
  console.log("Server running on port 3000");
});
