/* From 'seed' input string, replaces every
   'removeN':th word's  characters with ____'s
   starting from 'removeOffset':th word */
export const removeConstantWords = ({
  seed,
  removeN,
  removeOffset,
  replaceWith = '_',
}) => {
  let curOffset = removeOffset;
  return seed
    .replace(/\n/g, '\n ') // new word on line break
    .split(' ')
    .map((word, idx) => {
      if (word.replace(/\s/g, '').length === 0) {
        curOffset += 1; // skip non-words like empty lines
        return word;
      }
      return (idx % removeN) - ((curOffset - 1) % removeN) === 0 &&
        idx >= curOffset - 1
        ? word.replace(/./g, replaceWith)
        : word;
    })
    .filter((word) => word)
    .join(' ')
    .replace(replaceWith ? /\n /g : /\n\s+/g, '\n'); // remove earlier added spaces (and multilinebreaks if no replace)
};

/* From 'seed' input string, replaces each word's 
   characters with ____'s by 'removePercent' change % */
export const removeRandomWords = ({ seed, removePercent, replaceWith = '_' }) =>
  seed
    .replace(/\n/g, '\n ') // new word on line break
    .split(' ')
    .map((word) => {
      if (word.replace(/\s/g, '').length === 0) {
        return word;
      }
      return Math.random() < removePercent / 100
        ? word.replace(/./g, replaceWith)
        : word;
    })
    .filter((word) => word)
    .join(' ')
    .replace(replaceWith ? /\n /g : /\n\s+/g, '\n'); // remove earlier added spaces (and multilinebreaks if no replace)

/* From 'seed' input string, removes word / replaces each word's 
   characters with ____'s if it includes/exludes filterText */
export const removeFilteredWords = ({
  seed,
  filterText,
  include,
  replaceWith = '',
}) =>
  seed
    .replace(/\n/g, '\n ') // new word on line break
    .split(' ')
    .map((word) =>
      (
        filterText
          .toLowerCase()
          .split(' ')
          .filter((string) => string)
          .some((string) => word.toLowerCase().includes(string))
          ? !include
          : include
      )
        ? word
        : word.replace(/./g, replaceWith)
    )
    .filter((word) => word)
    .join(' ')
    .replace(replaceWith ? /\n /g : /\n\s+/g, '\n'); // remove earlier added spaces (and multilinebreaks if no replace)
