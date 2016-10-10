import dotenv from 'dotenv';
import { Heimdall } from 'mxd-heimdall';
import program from 'commander';
import redis from 'redis';

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
  const heimdall = new Heimdall({
    apikey: process.env.HEIMDALL_APIKEY,
    appid: process.env.HEIMDALL_APPID,
  });
  const redisClient = redis.createClient(process.env.REDIS_URL);
  platforms[platform]({
    botbuilderConnector,
    generalCommands: generalCommands({ heimdall }),
    generalModules,
    redisClient,
  });
} else {
  throw new Error(`Unknown platform '${platform}', available platforms: ${Object.keys(platforms).join(', ')}`);
}
