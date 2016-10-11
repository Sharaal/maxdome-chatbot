export default ({ ircClient, from, replyto }) => ({
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
      lines = lines.concat(attachments.map(
        attachment => this.link(attachment.link, attachment.title)
      ));
    }
    let line = lines.join(', ');
    if (replyto !== from) {
      line = `${from}: ${line}`;
    }
    ircClient.say(replyto, line);
  },
});
