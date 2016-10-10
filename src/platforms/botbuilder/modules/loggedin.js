export default ({ session }) => async () => new Promise((resolve) => {
  const account = { id: session.message.user.id };
  resolve(account);
});
