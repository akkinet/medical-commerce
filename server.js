import {setHttpServer, setWebSocketServer} from 'next-ws/server'
import { Server } from 'node:http';
import { parse } from 'node:url';
import next from 'next';
import { WebSocketServer } from 'ws';

const dev = process.env.NODE_ENV !== 'production';
const hostname = 'localhost';
const port = 3000;

const httpServer = new Server();
const webSocketServer = new WebSocketServer({ noServer: true });
// Tell Next WS about the HTTP and WebSocket servers before starting the custom server
setHttpServer(httpServer);
setWebSocketServer(webSocketServer);

const app = next({ dev, hostname, port, customServer: httpServer });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  httpServer
    .on('request', async (req, res) => {
      const parsedUrl = parse(req.url, true);
      await handle(req, res, parsedUrl);
    })
    .listen(port, () => {
      console.log(` ▲ Ready on http://${hostname}:${port}`);
    });
});