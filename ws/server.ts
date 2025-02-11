import { WebSocketServer, WebSocket } from "ws";

const wss = new WebSocketServer({ noServer: true });

wss.on('connection', function connection(ws) {
    ws.on('error', console.error);
  
    // ws.on('message', function message(data) {
    //   console.log('received: %s', data);
    // });
});