export default ({ redisClient }) => {
  const prefix = 'SESSIONS:';
  return {
    set: async (key, value) => new Promise((resolve) => {
      redisClient.set(prefix + key, JSON.stringify(value), () => { resolve(); });
    }),
    get: async key => new Promise((resolve) => {
      redisClient.get(prefix + key, (err, value) => {
        try {
          resolve(JSON.parse(value));
        } catch (e) {
          resolve();
        }
      });
    }),
    delete: async key => new Promise((resolve) => {
      redisClient.del(prefix + key, () => { resolve(); });
    }),
  };
};
