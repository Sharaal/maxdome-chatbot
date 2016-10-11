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
            attachment => {
              let heroCard = new builder.HeroCard(session)
                .title(attachment.title)
                .text(attachment.text)
                .tap(builder.CardAction.openUrl(session, attachment.link));
              if (attachment.image) {
                heroCard.images([
                  builder.CardImage.create(session, attachment.image)
                ]);
              }
              return heroCard;
            }
          ));
      session.send(message);
    }
  },
});
