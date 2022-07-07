#!/usr/bin/env node
import app from '../src/app';
import debugFactory from 'debug';
const debug = debugFactory('express-generator:server');
import http from 'http';
import { PORT } from '../src/config';

const port = normalizePort(PORT);
app.set('port', port);
const server = http.createServer(app);

server.listen(port, () => {
  console.log(
    'App is running at http://localhost:%d in %s mode',
    PORT,
    app.get('env'),
    '\nPress CTRL-C to stop\n'
  );
});
server.on('error', onError);
server.on('listening', onListening);

function normalizePort(val: string | undefined) {
  let port: number;
  if (typeof val === 'string') {
    port = parseInt(val, 10);
    if (isNaN(port)) {
      return val;
    }
    if (port >= 0) {
      return port;
    }
  }
  return false;
}

function onError(error: NodeJS.ErrnoException) {
  if (error?.syscall !== 'listen') {
    throw error;
  }

  const bind: string =
    typeof port === 'string' ? 'Pipe ' + port : 'Port ' + port;

  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges');
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(bind + ' is already in use');
      process.exit(1);
      break;
    default:
      throw error;
  }
}
function onListening() {
  const addr = server.address();
  const bind: string =
    typeof addr === 'string' ? 'pipe ' + addr : 'port ' + addr?.port;
  debug('Listening on ' + bind);
}
