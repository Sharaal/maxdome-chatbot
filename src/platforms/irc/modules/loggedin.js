export default ({ client, from, translate }) => async () => new Promise((resolve, reject) => {
  client.whois(from, (info) => {
    if (info.account) {
      const account = { id: info.account };
      resolve(account);
    } else {
      reject(new Error(translate.text('You are not logged in with an IRC account')));
    }
  });
});
