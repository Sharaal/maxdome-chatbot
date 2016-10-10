export default ({ req }) => ({ name: req.body.command, args: req.body.text });
