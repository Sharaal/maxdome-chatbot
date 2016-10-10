import mxdInfo from './mxd-info';
import mxdLogin from './mxd-login';
import mxdLogout from './mxd-logout';
import mxdSearch from './mxd-search';

export default ({ heimdall, sessions }) => ({
  'mxd-info': mxdInfo,
  'mxd-login': mxdLogin({ heimdall, sessions }),
  'mxd-logout': mxdLogout({ heimdall, sessions }),
  'mxd-search': mxdSearch({ heimdall }),
});
