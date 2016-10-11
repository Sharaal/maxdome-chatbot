import mxdInfo from './mxd-info';
import mxdLogin from './mxd-login';
import mxdLogout from './mxd-logout';
import mxdNotepadAdd from './mxd-notepad-add';
import mxdNotepadRemove from './mxd-notepad-remove';
import mxdSearch from './mxd-search';

export default ({ heimdall, sessions }) => ({
  'mxd-info': mxdInfo,
  'mxd-login': mxdLogin({ heimdall, sessions }),
  'mxd-logout': mxdLogout({ heimdall, sessions }),
  'mxd-notepad-add': mxdNotepadAdd({ heimdall }),
  'mxd-notepad-remove': mxdNotepadRemove({ heimdall }),
  'mxd-search': mxdSearch({ heimdall }),
});
