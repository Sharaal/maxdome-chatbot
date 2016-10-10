export default ({ heimdall, sessions }) => ({ loggedin, translate }) => async () => {
  const account = await loggedin();
  const session = await sessions.get(account.id);
  if (!session) {
    throw new Error(translate.text('You are not logged in in maxdome'));
  }
  try {
    await heimdall.post('/auth/keepalive', {
      headers: { 'mxd-session': session.sessionId },
    });
    return { account, session };
  } catch (e1) {
    try {
      const data = await heimdall.post('autologin_portal', {
        body: { autoLoginPin: session.autoLoginPin },
      });
      const newSession = {
        account,
        autoLoginPin: data.autoLoginPin,
        customer: { customerId: data.customer.customerId },
        sessionId: data.sessionId,
      };
      await sessions.set(account.id, newSession);
      return { account, session: newSession };
    } catch (e2) {
      await sessions.delete(account.id);
      throw new Error(translate.text('You are not logged in in maxdome'));
    }
  }
};
