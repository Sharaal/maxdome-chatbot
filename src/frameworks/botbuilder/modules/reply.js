import builder from 'botbuilder';

export default ({ session }) => ({
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
    session.send(lines.join(', '));
    if (attachments) {
      const message =
        new builder.Message(session)
          .textFormat(builder.TextFormat.xml)
          .attachments(attachments.map(
            attachment =>
              new builder.HeroCard(session)
                .title(attachment.title)
                .text(attachment.text)
                .tab(builder.CardAction.openUrl(session, attachment.link))
          ));
      session.send(message);
    }
  },
});
