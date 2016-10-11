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
              const heroCard = new builder.HeroCard(session)
                .title(attachment.title)
                .text(attachment.text)
                .tap(builder.CardAction.openUrl(session, attachment.link));
              attachment.image = 'https://01.static-maxdome.de/getAssetImage/objId:16599117/type:poster/width:138/height:200/imageId:17253442.jpg';
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
