import restify from 'restify';

import slackModules from './modules';

export default ({ generalCommands, generalModules }) => {
  const commands = generalCommands;
  const modules = Object.assign({}, generalModules, slackModules);

  const server = restify.createServer();

  server.post('/api', async (req, res) => {
    const { name, args } = modules.command({ req });
    const translate = modules.translate({ language: 'de' });
    const loggedin = modules.loggedin({ req });
    const heimdallLoggedin = modules.heimdallLoggedin({ loggedin, translate });
    const reply = modules.reply({ res });

    try {
      if (commands[name]) {
        await commands[name]({
          args,
          heimdallLoggedin,
          loggedin,
          reply,
          translate,
        });
      } else {
        throw new Error(translate.text(
          "Unknown command '%s', available commands: %s",
          name,
          Object.keys(commands).join(', ')
        ));
      }
    } catch (e) {
      reply.send(translate.text('Error: %s', e.message));
    }
  });

  server.listen(process.env.PORT);
};
