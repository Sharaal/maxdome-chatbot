import mxdInfo from './mxd-info';
import mxdSearch from './mxd-search';

export default ({ heimdall }) => ({
  'mxd-info': mxdInfo,
  'mxd-search': mxdSearch({ heimdall }),
});
