import builder from 'botbuilder';

import connectors from './connectors';
import consoleModules from './modules';

export default ({ botbuilderConnector, generalCommands, generalModules }) => {
  const commands = generalCommands;
  const modules = Object.assign({}, generalModules, consoleModules);

  let connector;
  if (connectors[botbuilderConnector]) {
    connector = connectors[botbuilderConnector]();
  } else {
    throw new Error(`Unknown botbuilderConnector '${botbuilderConnector}', available botbuilderConnectors: ${Object.keys(connectors).join(', ')}`);
  }

  const bot = new builder.UniversalBot(connector);

  bot.dialog('/', async (session) => {
    const message = session.message.text;

    const { name, args } = modules.command({ message });
    const loggedin = modules.loggedin({ session });
    const reply = modules.reply({ session });
    const translate = modules.translate({ language: 'de' });

    try {
      if (commands[name]) {
        await commands[name]({ args, loggedin, reply, translate });
      } else {
        throw new Error(translate.text(
          "Unknown command '%s', available commands: %s",
          name,
          Object.keys(commands).join(', ')
        ));
      }
    } catch (e) {
      session.send(translate.text('Error: %s', e.message));
    }
  });
};
