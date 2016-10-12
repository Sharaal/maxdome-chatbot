function link(url, label) {
  if (label) {
    return `${label} (${url})`;
  }
  return url;
}

export default ({ res }) => ({
  link,
  send: (text, attachments) => {
    let lines;
    if (Array.isArray(text)) {
      lines = text;
    } else {
      lines = [text];
    }
    if (attachments) {
      lines = lines.concat(attachments.map(
        attachment => link(attachment.link, attachment.title)
      ));
    }
    res.send({ displayText: lines.join(', ') });
  },
});
