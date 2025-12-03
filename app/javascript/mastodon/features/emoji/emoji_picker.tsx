import type { EmojiProps, PickerProps } from 'emoji-mart';
import EmojiRaw from 'emoji-mart/dist-es/components/emoji/nimble-emoji';
import PickerRaw from 'emoji-mart/dist-es/components/picker/nimble-picker';

import { assetHost } from 'mastodon/utils/config';

<<<<<<< HEAD
import EmojiData from './emoji_data.json';

const backgroundImageFnDefault = () => `${assetHost}/emoji/sheet_15_1.png`;
=======
import { EMOJI_MODE_NATIVE } from './constants';
import EmojiData from './emoji_data.json';
import { useEmojiAppState } from './mode';

const backgroundImageFnDefault = () => `${assetHost}/emoji/sheet_16_0.png`;
>>>>>>> v4.5.0

const Emoji = ({
  set = 'twitter',
  sheetSize = 32,
  sheetColumns = 62,
  sheetRows = 62,
  backgroundImageFn = backgroundImageFnDefault,
  ...props
}: EmojiProps) => {
<<<<<<< HEAD
=======
  const { mode } = useEmojiAppState();
>>>>>>> v4.5.0
  return (
    <EmojiRaw
      data={EmojiData}
      set={set}
      sheetSize={sheetSize}
      sheetColumns={sheetColumns}
      sheetRows={sheetRows}
<<<<<<< HEAD
=======
      native={mode === EMOJI_MODE_NATIVE}
>>>>>>> v4.5.0
      backgroundImageFn={backgroundImageFn}
      {...props}
    />
  );
};

const Picker = ({
  set = 'twitter',
  sheetSize = 32,
  sheetColumns = 62,
  sheetRows = 62,
  backgroundImageFn = backgroundImageFnDefault,
  ...props
}: PickerProps) => {
<<<<<<< HEAD
=======
  const { mode } = useEmojiAppState();
>>>>>>> v4.5.0
  return (
    <PickerRaw
      data={EmojiData}
      set={set}
      sheetSize={sheetSize}
      sheetColumns={sheetColumns}
      sheetRows={sheetRows}
      backgroundImageFn={backgroundImageFn}
<<<<<<< HEAD
=======
      native={mode === EMOJI_MODE_NATIVE}
>>>>>>> v4.5.0
      {...props}
    />
  );
};

export { Picker, Emoji };
