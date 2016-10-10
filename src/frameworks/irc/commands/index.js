import mxdChannels from './mxd-channels';
import mxdJoin from './mxd-join';
import mxdPart from './mxd-part';

export default ({ channels }) => ({
  'mxd-channels': mxdChannels({ channels }),
  'mxd-join': mxdJoin({ channels }),
  'mxd-part': mxdPart({ channels }),
});
