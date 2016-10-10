import channels from './channels';

export default ({ redisClient }) => ({
  channels: channels({ redisClient }),
});
