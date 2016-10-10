export default ({ ircClient, from, to }) => {
  if (ircClient.nick === to) {
    return from;
  }
  return to;
};
