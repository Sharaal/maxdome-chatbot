export default ({ client, from, to }) => {
  if (client.nick === to) {
    return from;
  }
  return to;
};
