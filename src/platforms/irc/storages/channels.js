export default ({ client }) => {
  const key = 'IRC:CHANNELS';
  return {
    add: async value => new Promise((resolve) => {
      client.sadd(key, value, () => { resolve(); });
    }),
    values: async () => new Promise((resolve) => {
      client.smembers(key, (err, values) => {
        resolve(values);
      });
    }),
    delete: async value => new Promise((resolve) => {
      client.srem(key, value, () => { resolve(); });
    }),
  };
};
