export default ({ channelsStorage }) => async ({ admin, reply, translate }) => {
  await admin();
  const channels = await channelsStorage.values();
  if (channels.length) {
    reply.send(channels.join(', '));
  } else {
    reply.send(translate.text('No channels joined'));
  }
};
