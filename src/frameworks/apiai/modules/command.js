export default ({ req }) => ({
  name: req.body.result.action,
  args: req.body.result.parameters,
});
