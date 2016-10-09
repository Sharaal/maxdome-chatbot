import irc from 'irc';

import ircCommands from './commands';
import ircModules from './modules';

export default ({ generalCommands, generalModules }) => {
  const commands = Object.assign({}, generalCommands, ircCommands);
  const modules = Object.assign({}, generalModules, ircModules);

  let options = {};
  if (process.env.IRC_USERNAME) {
    options = Object.assign(options, {
      sasl: true,
      userName: process.env.IRC_USERNAME,
      password: process.env.IRC_PASSWORD,
    });
  }

  const client = new irc.Client(process.env.IRC_HOST, process.env.IRC_NICK, options);

  client.addListener('registered', () => {
    // const channels = await channelStorage.values();
    const channels = ['#maxdome'];
    for (const channel of channels) {
      client.join(channel);
    }
    if (process.env.IRC_ADMIN_ID) {
      client.say(process.env.IRC_ADMIN_ID, 'registered');
    }
  });

  client.addListener('error', (message) => {
    console.log('error: ', message);
  });

  client.addListener('message', async (from, to, message) => {
    const replyto = modules.replyto({ client, from, to });
    const { name, args } = modules.command({ from, message, replyto });
    if (!name) {
      return;
    }
    const translate = modules.translate({ language: 'de' });
    const loggedin = modules.loggedin({ client, from, translate });
    const admin = modules.admin({ loggedin, translate });
    const reply = modules.reply({ client, from, replyto });

    try {
      if (commands[name]) {
        await commands[name]({ admin, args, loggedin, reply, translate });
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
