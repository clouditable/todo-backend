import http from 'http';
import chalk from 'chalk';

import mongoose from './core/mongoose';

import { PORT, HOST } from './env';
import app from './app';
import { seed } from './core/seed';

const server = http.Server(app);

server.listen(Number(PORT), HOST, () => {
  console.log(chalk.hex('#009688')('🚀 App: Bootstrap Succeeded.'));
  console.log(chalk.hex('#009688')(`🚀 Host: http://${HOST}:${PORT}/.`));

  mongoose.connection.once('open', async () => {
    console.log(chalk.hex('#009688')('🚀 Mongo: Connection Succeeded.'));
    await seed();
  });
  mongoose.connection.on('error', err => console.error(err));
});

export default server;
