import heimdallLoggedin from './heimdall-loggedin';
import translate from './translate';

export default ({ heimdall, sessions }) => ({
  heimdallLoggedin: heimdallLoggedin({ heimdall, sessions }),
  translate,
});
