import irc from 'irc';

import _channelsStorage from './storages/channels';
import ircCommands from './commands';
import ircModules from './modules';

export default ({ generalCommands, generalModules, redisClient }) => {
  const channelsStorage = _channelsStorage({ client: redisClient });
  const commands = Object.assign(
    {},
    generalCommands,
    ircCommands({ channelsStorage })
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
    const channels = await channelsStorage.values();
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
    const replyto = modules.replyto({ client: ircClient, from, to });
    const { name, args } = modules.command({ from, message, replyto });
    if (!name) {
      return;
    }
    const translate = modules.translate({ language: 'de' });
    const loggedin = modules.loggedin({ client: ircClient, from, translate });
    const admin = modules.admin({ loggedin, translate });
    const reply = modules.reply({ client: ircClient, from, replyto });

    try {
      if (commands[name]) {
        await commands[name]({
          admin,
          args,
          client: ircClient,
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
