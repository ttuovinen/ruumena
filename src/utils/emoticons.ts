import { randomFrom } from './metaUtils';

// Random retro-emoticons =o :P ;DD
const emoEyes = [':', ':', ':', ';', '='];
const emoMouths = [')', ')', ')', 'D', 'DD', '(', 'o', 'P', '|', '/'];

export const randomEmoticon = () =>
  `${randomFrom(emoEyes)}${randomFrom(emoMouths)}`;

export const emoticonize = (seed: string) => {
  let newText = seed;
  // replace between-sentences punctuations with random emoticons...
  while (newText.match(/[.!?] /)) {
    newText = newText.replace(/[.!?] /, ` ${randomEmoticon()} `);
  }
  return (
    // ...and add one random emoticon to the end of each text line
    newText
      .split('\n')
      .map((line) =>
        line.replace(/[ \t]/g, '').length ? `${line} ${randomEmoticon()}` : line
      )
      .join('\n')
  );
};
