import irc from 'irc';

import ircCommands from './commands';
import ircModules from './modules';
import ircStorages from './storages';

export default ({ generalCommands, generalModules, generalStorages, redisClient }) => {
  const storages = Object.assign({}, generalStorages, ircStorages({ redisClient }));
  const commands = Object.assign(
    {},
    generalCommands,
    ircCommands({ channels: storages.channels })
  );
  const modules = Object.assign({}, generalModules, ircModules);

  let options = {};
  if (process.env.IRC_USERNAME) {
    options = Object.assign(options, {
      sasl: true,
      userName: process.env.IRC_USERNAME,
      password: process.env.IRC_PASSWORD,
    });
  }

  const ircClient = new irc.Client(process.env.IRC_HOST, process.env.IRC_NICK, options);

  ircClient.addListener('registered', async () => {
    const channels = await storages.channels.values();
    for (const channel of channels) {
      ircClient.join(channel);
    }
    if (process.env.IRC_ADMIN_ID) {
      ircClient.say(process.env.IRC_ADMIN_ID, 'registered');
    }
  });

  ircClient.addListener('error', (message) => {
    console.log('error: ', message);
  });

  ircClient.addListener('message', async (from, to, message) => {
    const replyto = modules.replyto({ ircClient, from, to });
    const { name, args } = modules.command({ from, message, replyto });
    if (!name) {
      return;
    }
    const translate = modules.translate({ language: 'de' });
    const loggedin = modules.loggedin({ ircClient, from, translate });
    const admin = modules.admin({ loggedin, translate });
    const heimdallLoggedin = modules.heimdallLoggedin({ loggedin, translate });
    const reply = modules.reply({ ircClient, from, replyto });

    try {
      if (commands[name]) {
        await commands[name]({
          admin,
          args,
          heimdallLoggedin,
          ircClient,
          from,
          loggedin,
          reply,
          replyto,
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
};
