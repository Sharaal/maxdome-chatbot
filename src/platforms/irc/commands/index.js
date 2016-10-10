import channels from './channels';
import join from './join';
import part from './part';

export default ({ channelsStorage }) => ({
  channels: channels({ channelsStorage }),
  join: join({ channelsStorage }),
  part: part({ channelsStorage }),
});
