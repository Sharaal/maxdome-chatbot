import builder from 'botbuilder';

export default () => {
  const connector = new builder.ConsoleConnector().listen();
  return connector;
};
