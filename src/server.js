const routes = require('./routes');
const hapi = require('@hapi/hapi');
const init = async () => {
  const server = hapi.server({
    port: 5000,
    host: 'localhost',
    routes: {
      cors: {
        origin: ['*'],
      },
    },
  });
  server.route(routes);
  await server.start();
  console.log(`Server run at ${server.info.uri}\n`);
};
init();
