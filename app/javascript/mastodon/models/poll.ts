import escapeTextContentForBrowser from 'escape-html';

import type { ApiPollJSON, ApiPollOptionJSON } from 'mastodon/api_types/polls';
<<<<<<< HEAD
import emojify from 'mastodon/features/emoji/emoji';

import { CustomEmojiFactory, makeEmojiMap } from './custom_emoji';
import type { CustomEmoji, EmojiMap } from './custom_emoji';
=======

import { CustomEmojiFactory } from './custom_emoji';
import type { CustomEmoji } from './custom_emoji';
>>>>>>> v4.5.0

interface PollOptionTranslation {
  title: string;
  titleHtml: string;
}

export interface PollOption extends ApiPollOptionJSON {
  voted: boolean;
  titleHtml: string;
  translation: PollOptionTranslation | null;
}

<<<<<<< HEAD
export function createPollOptionTranslationFromServerJSON(
  translation: { title: string },
  emojiMap: EmojiMap,
) {
  return {
    ...translation,
    titleHtml: emojify(
      escapeTextContentForBrowser(translation.title),
      emojiMap,
    ),
=======
export function createPollOptionTranslationFromServerJSON(translation: {
  title: string;
}) {
  return {
    ...translation,
    titleHtml: escapeTextContentForBrowser(translation.title),
>>>>>>> v4.5.0
  } as PollOptionTranslation;
}

export interface Poll
  extends Omit<ApiPollJSON, 'emojis' | 'options' | 'own_votes'> {
  emojis: CustomEmoji[];
  options: PollOption[];
  own_votes?: number[];
}

const pollDefaultValues = {
  expired: false,
  multiple: false,
  voters_count: 0,
  votes_count: 0,
  voted: false,
  own_votes: [],
};

export function createPollFromServerJSON(
  serverJSON: ApiPollJSON,
  previousPoll?: Poll,
) {
<<<<<<< HEAD
  const emojiMap = makeEmojiMap(serverJSON.emojis);

=======
>>>>>>> v4.5.0
  return {
    ...pollDefaultValues,
    ...serverJSON,
    emojis: serverJSON.emojis.map((emoji) => CustomEmojiFactory(emoji)),
    options: serverJSON.options.map((optionJSON, index) => {
      const option = {
        ...optionJSON,
        voted: serverJSON.own_votes?.includes(index) || false,
<<<<<<< HEAD
        titleHtml: emojify(
          escapeTextContentForBrowser(optionJSON.title),
          emojiMap,
        ),
=======
        titleHtml: escapeTextContentForBrowser(optionJSON.title),
>>>>>>> v4.5.0
      } as PollOption;

      const prevOption = previousPoll?.options[index];
      if (prevOption?.translation && prevOption.title === option.title) {
        const { translation } = prevOption;

<<<<<<< HEAD
        option.translation = createPollOptionTranslationFromServerJSON(
          translation,
          emojiMap,
        );
=======
        option.translation =
          createPollOptionTranslationFromServerJSON(translation);
>>>>>>> v4.5.0
      }

      return option;
    }),
  } as Poll;
}
