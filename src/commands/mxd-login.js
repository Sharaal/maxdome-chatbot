export default ({ heimdall, sessions }) => async ({ args, loggedin, reply, translate }) => {
  const account = await loggedin();
  const [userId, phrase] = args.split(' ');
  const data = await heimdall.post('auth/login', {
    body: { userId, phrase, autoLogin: true },
  });
  const session = {
    account,
    autoLoginPin: data.autoLoginPin,
    customer: { customerId: data.customer.customerId },
    sessionId: data.sessionId,
  };
  await sessions.set(account.id, session);
  reply.send(translate.text('Login sucessful'));
};
