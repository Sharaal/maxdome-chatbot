import builder from 'botbuilder';
import restify from 'restify';

export default () => {
  const server = restify.createServer();
  server.listen(process.env.PORT);
  const connector = new builder.ChatConnector({
    appId: process.env.MICROSOFT_APP_ID,
    appPassword: process.env.MICROSOFT_APP_PASSWORD,
  });
  server.post('/api/messages', connector.listen());
  return connector;
};
