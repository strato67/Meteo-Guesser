import WebSocket from 'ws';
import http from 'http';
import {URL} from 'url';
import { webSocketServer } from './server';

const port = 8080;
const server = http.createServer();
const webSocketServers: { [key: string]: WebSocket.Server } = {};

server.on('request', (req, res) => {
  res.writeHead(200);
  res.end('WebSocket server is running');
});

server.listen(port, () => {
  console.log(`Server started on port ${port}`);
});

server.on('upgrade', (request, socket, head) => {
  const url = new URL(request.url || '', `http://${request.headers.host}`)
  const pathname = url.pathname;

  if (!pathname) {
    socket.destroy();
    return;
  }

  if (!webSocketServers[pathname]) {
    webSocketServers[pathname] = webSocketServer();
    console.log(`${Object.keys(webSocketServers).length} server(s) active.`)
  }

  const wss = webSocketServers[pathname];
  wss.handleUpgrade(request, socket, head, (ws: WebSocket) => {
    wss.emit('connection', ws, request);
  });

});

const removeEmptyServers = () => {
  for(const [id, server] of Object.entries(webSocketServers)){
    if(server.clients.size === 0){
      server.close(()=>{
        delete webSocketServers[id]
        console.log(`Removed server ${id} for inactivity.`)
      })
    }
  }
};

setInterval(removeEmptyServers, 30000)