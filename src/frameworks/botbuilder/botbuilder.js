import builder from 'botbuilder';

import connectors from './connectors';
import consoleModules from './modules';

export default ({ generalCommands, generalModules, platform }) => {
  const commands = generalCommands;
  const modules = Object.assign({}, generalModules, consoleModules);

  let connector;
  if (connectors[platform.connector]) {
    connector = connectors[platform.connector]();
  } else {
    throw new Error(`Unknown connector '${platform.connector}', available connectors: ${Object.keys(connectors).join(', ')}`);
  }

  const bot = new builder.UniversalBot(connector);

  bot.dialog('/', async (session) => {
    const message = session.message.text;

    const { name, args } = modules.command({ message });
    const loggedin = modules.loggedin({ session });
    const reply = modules.reply({ session });
    const translate = modules.translate({ language: 'de' });
    const heimdallLoggedin = modules.heimdallLoggedin({ loggedin, translate });

    try {
      if (commands[name]) {
        await commands[name]({ args, heimdallLoggedin, loggedin, reply, translate });
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
};
