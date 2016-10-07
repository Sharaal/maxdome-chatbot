import util from 'util';

import languages from '../languages';

export default ({ language }) => ({
  text: (key, ...variables) => {
    let value;
    if (languages[language] && languages[language][key]) {
      value = languages[language][key];
    } else {
      value = key;
    }
    return util.format.apply(null, [value].concat(variables));
  },
});
