export default ({ ircClient, from, translate }) => async () => new Promise((resolve, reject) => {
  ircClient.whois(from, (info) => {
    if (info.account) {
      const account = { id: info.account };
      resolve(account);
    } else {
      reject(new Error(translate.text('You are not logged in with an IRC account')));
    }
  });
});
