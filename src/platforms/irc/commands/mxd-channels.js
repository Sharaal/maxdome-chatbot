export default ({ channels }) => async ({ admin, reply, translate }) => {
  await admin();
  const text = (await channels.values()).join(', ');
  if (text) {
    reply.send(text);
  } else {
    reply.send(translate.text('No channels joined'));
  }
};
