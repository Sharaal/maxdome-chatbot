export default ({ redisClient }) => {
  const key = 'IRC:CHANNELS';
  return {
    add: async value => new Promise((resolve) => {
      redisClient.sadd(key, value, () => { resolve(); });
    }),
    values: async () => new Promise((resolve) => {
      redisClient.smembers(key, (err, values) => {
        resolve(values);
      });
    }),
    delete: async value => new Promise((resolve) => {
      redisClient.srem(key, value, () => { resolve(); });
    }),
  };
};
