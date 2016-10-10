import dotenv from 'dotenv';
import { Heimdall } from 'mxd-heimdall';
import redis from 'redis';

import frameworks from './frameworks';
import generalCommands from './commands';
import generalModules from './modules';
import _generalStorages from './storages';
import platforms from './platforms';

dotenv.config({ silent: true });

const platform = platforms[process.env.PLATFORM];
if (!platform) {
  throw new Error(`Unknown platform '${process.env.PLATFORM}', available platforms: ${Object.keys(platforms).join(', ')}`);
}

const framework = frameworks[platform.framework];
if (!framework) {
  throw new Error(`Unknown framework '${platform.framework}', available frameworks: ${Object.keys(frameworks).join(', ')}`);
}

const heimdall = new Heimdall({
  apikey: process.env.HEIMDALL_APIKEY,
  appid: process.env.HEIMDALL_APPID,
});
const redisClient = redis.createClient(process.env.REDIS_URL);
const generalStorages = _generalStorages({ redisClient });

framework({
  generalCommands: generalCommands({ heimdall, sessions: generalStorages.sessions }),
  generalModules: generalModules({ heimdall, sessions: generalStorages.sessions }),
  generalStorages,
  platform,
  redisClient,
});
