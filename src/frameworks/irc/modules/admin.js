export default ({ loggedin, translate }) => async () => {
  const account = await loggedin();
  if (account.id !== process.env.IRC_ADMIN_ID) {
    throw new Error(translate.text('You are not authorized for the command'));
  }
};
