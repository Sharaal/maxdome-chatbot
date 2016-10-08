import info from './info';
import mxdSearch from './mxd-search';

export default ({ heimdall }) => ({
  info,
  'mxd-search': mxdSearch({ heimdall }),
});
