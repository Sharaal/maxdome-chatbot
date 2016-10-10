import sessions from './sessions';

export default ({ redisClient }) => ({
  sessions: sessions({ redisClient }),
});
