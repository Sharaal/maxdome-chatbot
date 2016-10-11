export default ({ res }) => ({
  link: (url, label) => {
    if (label) {
      return `<${url}|${label}>`;
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
    res.send({
      response_type: 'in_channel',
      text: lines.join(', '),
      attachments: attachments.map(
        attachment => ({
          title: attachment.title,
          title_link: attachment.link,
          text: attachment.text,
          thumb_url: attachment.image,
        })
      ),
    });
  },
});
