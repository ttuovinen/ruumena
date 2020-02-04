import { countWords } from './statistics';
import { createSorter, textToWords } from './metaUtils';

/* Let's create a bunch of sorter functions */
export const byLength = createSorter(i => -i.length);
export const fromStart = createSorter(i => i.toLowerCase());
export const fromEnd = createSorter(i =>
  [...i.toLowerCase()].reverse().join('')
);
export const shuffle = createSorter(() => Math.random() - 0.5);

/* Function for creating wordlist functions */
const createWordLister = sorter => ({ seed, reverse, noDuplicates }) => {
  let words = textToWords(seed).sort(sorter);
  if (noDuplicates) {
    words = [...new Set(words)];
  }
  if (reverse) {
    words.reverse();
  }
  return words.join(' ');
};

/* Let's create also a bunch of word listers with our sorters and export them */
export const lengthsortWords = createWordLister(byLength);
export const alphasortWords = createWordLister(fromStart);
export const alphasortWordsFromEnd = createWordLister(fromEnd);
export const shuffleWords = createWordLister(shuffle);

/* Sort by count is a bit different case so we'll do it separately */
export const countsortWords = ({ seed, reverse, noDuplicates }) => {
  const words = textToWords(seed);
  const wordCounts = countWords(words.join(' '));
  let returnWords = [];
  if (noDuplicates) {
    returnWords = wordCounts.map(item => item.key);
  } else {
    wordCounts.forEach(({ key, count }) =>
      returnWords.push(Array(count).fill(key))
    );
    returnWords = [...returnWords.flat()];
  }
  if (reverse) {
    returnWords.reverse();
  }
  return returnWords.join(' ');
};
