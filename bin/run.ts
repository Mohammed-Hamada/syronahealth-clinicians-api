#!/usr/bin/env node
import debugFactory from 'debug';
import http from 'http';
import app from '../src/app';
import { PORT } from '../src/config';
import sequelize from '../src/database';

const debug = debugFactory('express-generator:server');

// Test Database Connection
sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch((err) => {
    console.error('Unable to connect to the database:', err);
  });

const server = http.createServer(app);

// Test if server running successfully
function normalizePort(val: string | undefined): number | string | boolean {
  let port: number;
  if (typeof val === 'string') {
    port = parseInt(val, 10);
    if (Number.isNaN(port)) {
      return val;
    }
    if (port >= 0) {
      return port;
    }
  }
  return false;
}

const port = normalizePort(PORT);
app.set('port', port);

function onError(error: NodeJS.ErrnoException): void {
  if (error?.syscall !== 'listen') {
    throw error;
  }

  const bind: string = typeof port === 'string' ? `Pipe ${port}` : `Port ${port}`;

  switch (error.code) {
    case 'EACCES':
      console.error(`${bind} requires elevated privileges`);
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(`${bind} is already in use`);
      process.exit(1);
      break;
    default:
      throw error;
  }
}

function onListening(): void {
  const addr = server.address();
  const bind: string = typeof addr === 'string' ? `pipe ${addr}` : `port ${addr?.port}`;
  debug(`Listening on ${bind}`);
}

server.listen(port, () => {
  console.log(
    'App is running at http://localhost:%d in %s mode',
    PORT,
    app.get('env'),
    '\nPress CTRL-C to stop\n',
  );
});
server.on('error', onError);
server.on('listening', onListening);
