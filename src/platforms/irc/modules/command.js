export default ({ from, message, replyto }) => {
  let name;
  let args;
  if (message.startsWith('!')) {
    const index = message.indexOf(' ');
    if (index !== -1) {
      name = message.substring(1, index);
      args = message.substring(index + 1);
    } else {
      name = message.substring(1);
    }
  } else if (from === replyto) {
    name = 'mxd-search';
    args = message;
  }
  return { name, args };
};
