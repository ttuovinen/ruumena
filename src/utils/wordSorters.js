import { countWords } from './statistics';
import { createSorter, specialChars, textToWords } from './metaUtils';

/* Let's create a bunch of sorter functions */
export const byLength = createSorter((i) => -i.length);
export const fromStart = createSorter((i) => i.toLowerCase());
export const fromEnd = createSorter((i) =>
  [...i.toLowerCase()].reverse().join('')
);

/* Function for creating wordlist functions */
const createWordLister = (sorter) => ({ seed, reverse, noDuplicates }) => {
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

/* Sort by count is a bit different case so we'll do it separately */
export const countsortWords = ({ seed, reverse, noDuplicates }) => {
  const wordCounts = countWords(seed);
  const returnWords = noDuplicates
    ? wordCounts.map((item) => item.key)
    : wordCounts.flatMap(({ key, count }) => Array(count).fill(key));
  if (reverse) {
    returnWords.reverse();
  }
  return returnWords.join(' ');
};

/* Also, let's do shuffle with Fisher-Yates algorithm to get even distributions
   (instead of array-sort function like `() => Math.random() - 0.5`) */
export const shuffleWords = ({ seed, reverse, noDuplicates }) => {
  let words = textToWords(seed);
  if (noDuplicates) {
    words = [...new Set(words)];
  }
  for (let i = words.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * i);
    [words[i], words[j]] = [words[j], words[i]];
  }
  if (reverse) {
    words.reverse();
  }
  return words.join(' ');
};

/* Sort by softness of the letters (bit subjectively according to finnish pronounciation) */
const softLetters = 'hjlmnvw';
const semiSoftLetters = 'aou';
const semiHarshLetters = 'syüäö';
const harshLetters = 'dkprt';

export const softnesssortWords = ({ seed, reverse, noDuplicates }) => {
  let words = textToWords(seed);
  if (noDuplicates) {
    words = [...new Set(words)];
  }
  words = words
    .map((item) => {
      const letters = item.toLowerCase().replace(specialChars, '').split('');
      const value = letters.reduce((soFar, letter) => {
        if (softLetters.includes(letter)) {
          return soFar + 3;
        }
        if (semiSoftLetters.includes(letter)) {
          return soFar + 1;
        }
        if (semiHarshLetters.includes(letter)) {
          return soFar - 1;
        }
        if (harshLetters.includes(letter)) {
          return soFar - 3;
        }
        return soFar;
      }, 0);
      // give small handicap to shorter words
      return [item, value / Math.log(Math.log(letters.length + 1) + 0.5)];
    })
    .sort((a, b) => b[1] - a[1])
    .map((item) => item[0]);
  if (reverse) {
    words.reverse();
  }
  return words.join(' ');
};
