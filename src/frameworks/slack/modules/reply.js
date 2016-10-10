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
    res.send({ response_type: 'in_channel', text: lines.join(', '), attachments });
  },
});
