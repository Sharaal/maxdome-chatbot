export default ({ channelsStorage }) => async ({ admin, args, client, reply, translate }) => {
  await admin();
  await channelsStorage.add(args);
  client.join(args, () => {
    reply.send(translate.text("Channel '%s' joined", args));
  });
};
