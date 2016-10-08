import { AssetsQuery } from 'mxd-heimdall';

export default ({ heimdall }) => async ({ args, reply, translate }) => {
  if (!args) {
    return;
  }
  const query = new AssetsQuery()
    .filter('contentTypeSeriesOrMovies')
    .filter('search', args)
    .query('pageSize', process.env.MXD_SEARCH_PAGESIZE || 3);
  const assets = await heimdall.getAssets(query);
  if (assets.length) {
    const hostname = process.env.MXD_SEARCH_HOSTNAME || 'store.maxdome.de';
    const attachments = assets.map(asset => {
      return {
        title: reply.link(`https://${hostname}/${asset.id}`, asset.title),
        text: asset.description
      };
    });
    reply.send(
      reply.link(`https://${hostname}/suche?search=${encodeURIComponent(args)}`, translate.text('Show all results...')),
      attachments
    );
  } else {
    reply.send(translate.text("No results found for '%s'", args));
  }
};
