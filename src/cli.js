import dotenv from 'dotenv';
import { Heimdall } from 'mxd-heimdall';
import program from 'commander';
import redis from 'redis';

import generalCommands from './commands';
import generalModules from './modules';
import _generalStorages from './storages';
import frameworks from './frameworks';

dotenv.config({ silent: true });

program
  .option('-p, --framework [name]', 'Use the specified framework [botbuilder]', 'botbuilder')
  .option('-b, --botbuilderConnector [name]', 'Use the specified connector of botbuilder [console]', 'console')
  .parse(process.argv);

const framework = program.framework;
const botbuilderConnector = program.botbuilderConnector;

if (frameworks[framework]) {
  const heimdall = new Heimdall({
    apikey: process.env.HEIMDALL_APIKEY,
    appid: process.env.HEIMDALL_APPID,
  });
  const redisClient = redis.createClient(process.env.REDIS_URL);
  const generalStorages = _generalStorages({ redisClient });
  frameworks[framework]({
    botbuilderConnector,
    generalCommands: generalCommands({ heimdall, sessions: generalStorages.sessions }),
    generalModules: generalModules({ heimdall, sessions: generalStorages.sessions }),
    generalStorages,
    redisClient,
  });
} else {
  throw new Error(`Unknown framework '${framework}', available frameworks: ${Object.keys(frameworks).join(', ')}`);
}
