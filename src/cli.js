import dotenv from 'dotenv';
import program from 'commander';

import adapters from './adapters';
import generalCommands from './commands';
import generalModules from './modules';

dotenv.config({ silent: true });

program
  .option('-a, --adapter [name]', 'Use the specified adapter [botbuilder]', 'botbuilder')
  .option('-b, --botbuilderConnector [name]', 'Use the specified connector of botbuilder [console]', 'console')
  .parse(process.argv);

const adapter = program.adapter;
const botbuilderConnector = program.botbuilderConnector;

if (adapters[adapter]) {
  adapters[adapter]({ botbuilderConnector, generalCommands, generalModules });
} else {
  throw new Error(`Unknown adapter '${adapter}', available adapters: ${Object.keys(adapters).join(', ')}`);
}
