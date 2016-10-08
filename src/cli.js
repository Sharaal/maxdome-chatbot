import dotenv from 'dotenv';
import program from 'commander';

import generalCommands from './commands';
import generalModules from './modules';
import platforms from './platforms';

dotenv.config({ silent: true });

program
  .option('-p, --platform [name]', 'Use the specified platform [botbuilder]', 'botbuilder')
  .option('-b, --botbuilderConnector [name]', 'Use the specified connector of botbuilder [console]', 'console')
  .parse(process.argv);

const platform = program.platform;
const botbuilderConnector = program.botbuilderConnector;

if (platforms[platform]) {
  platforms[platform]({ botbuilderConnector, generalCommands, generalModules });
} else {
  throw new Error(`Unknown platform '${platform}', available platforms: ${Object.keys(platforms).join(', ')}`);
}
