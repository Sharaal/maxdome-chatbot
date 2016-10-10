export default ({ channels }) => async ({ admin, args, ircClient, reply, translate }) => {
  await admin();
  await channels.add(args);
  ircClient.join(args, () => {
    reply.send(translate.text("Channel '%s' joined", args));
  });
};
