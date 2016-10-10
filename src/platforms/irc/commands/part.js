export default ({ channelsStorage }) =>
  async ({ admin, args, client, from, reply, replyto, translate }) => {
    await admin();
    if (args) {
      await channelsStorage.delete(args);
      client.part(args, () => {
        if (from === replyto) {
          reply.send(translate.text("Channel '%s' parted", args));
        }
      });
    } else {
      await channelsStorage.delete(replyto);
      client.part(replyto);
    }
  };
