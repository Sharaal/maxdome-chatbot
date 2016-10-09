export default ({ client, from, replyto }) => ({
  link: (url, label) => {
    if (label) {
      return `${label} (${url})`;
    }
    return url;
  },
  send: (text, attachments) => {
    let lines;
    if (Array.isArray(text)) {
      lines = text;
    } else {
      lines = [text];
    }
    if (attachments) {
      lines = lines.concat(attachments.map(attachment => attachment.title));
    }
    let line = lines.join(', ');
    if (replyto !== from) {
      line = `${from}: ${line}`;
    }
    client.say(replyto, line);
  },
});
