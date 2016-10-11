export default ({ heimdall }) => async ({ args, heimdallLoggedin, reply, translate }) => {
  const { session } = await heimdallLoggedin();
  await heimdall.post(`mxd/notepad/${session.customer.customerId}`, {
    body: { contentId: args },
    headers: { 'mxd-session': session.sessionId },
  });
  reply.send(translate.text("Asset with ID '%s' added", args));
};
