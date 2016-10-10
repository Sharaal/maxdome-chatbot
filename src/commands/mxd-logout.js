export default ({ heimdall, sessions }) => async ({ heimdallLoggedin, reply, translate }) => {
  const { account, session } = await heimdallLoggedin();
  await heimdall.post('auth/logout', {
    headers: { 'mxd-session': session.sessionId },
  });
  await sessions.delete(account.id);
  reply.send(translate.text('Logout sucessful'));
};
