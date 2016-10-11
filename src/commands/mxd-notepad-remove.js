export default ({ heimdall }) => async ({ args, heimdallLoggedin, reply, translate }) => {
  const { session } = await heimdallLoggedin();
  await heimdall.delete(`mxd/notepad/${session.customer.customerId}/content/${encodeURIComponent(args)}`, {
    headers: { 'mxd-session': session.sessionId },
  });
  reply.send(translate.text("Asset with ID '%s' removed", args));
};
