export default ({ channels }) =>
  async ({ admin, args, ircClient, from, reply, replyto, translate }) => {
    await admin();
    if (args) {
      await channels.delete(args);
      ircClient.part(args, () => {
        if (from === replyto) {
          reply.send(translate.text("Channel '%s' parted", args));
        }
      });
    } else {
      await channels.delete(replyto);
      ircClient.part(replyto);
    }
  };
