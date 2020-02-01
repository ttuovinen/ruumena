import { by, specialChars, textToWords } from './metaUtils';

// counts amount of each item in text
// and return it in form
// [{ item: 'a', count: 523, percent 16,23 }, {...}...]

const createCounter = preProcess => input => {
  const buckets = {};
  const items = preProcess(input);
  items.forEach(item => {
    buckets[item] = (buckets[item] || 0) + 1;
  });
  const total = items.length;
  return Object.entries(buckets)
    .map(([key, count]) => ({
      key,
      count,
      percent: Math.round((count / total) * 10000) / 100,
    }))
    .reverse()
    .sort(by('count'))
    .reverse();
};

export const countCharacters = createCounter(input => input.split(''));
export const countLetters = createCounter(input =>
  input
    .replace(specialChars, '')
    .replace(/[ 0-9]/g, '')
    .toUpperCase()
    .split('')
);
export const countWords = createCounter(input => textToWords(input));
export const countSentences = createCounter(input =>
  input.split(' ').filter(item => item)
);
export const countLines = createCounter(input =>
  input.split('\n').filter(item => item)
);
