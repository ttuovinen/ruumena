import { countItems } from './statistics';
import { createSorter, specialChars, textToItems } from './metaUtils';
import { UnitOptions } from '../types/types';

type CompareFn = (a: string, b: string) => number | boolean;

interface ListerProps {
  seed: string;
  unit: UnitOptions;
  reverse: boolean;
  noDuplicates: boolean;
}

// Helpers
const getJoiner = (unit: string) => (unit === 'word' ? ' ' : '\n\n');

// Sorter functions
const byLength = createSorter((i: string) => i.length);
const fromStart = createSorter((i: string) =>
  i.toLowerCase().replace(specialChars, '').trim()
);
const fromEnd = createSorter((i: string) =>
  [...i.toLowerCase().replace(specialChars, '').trim()].reverse().join('')
);

// Lister creator
const createLister = (sorter: CompareFn) => ({
  seed,
  unit,
  reverse,
  noDuplicates,
}: ListerProps) => {
  let items = textToItems(seed, unit).sort(sorter);
  if (noDuplicates) {
    items = [...new Set(items)];
  }
  if (reverse) {
    items.reverse();
  }
  return items.join(getJoiner(unit));
};

// Create a bunch of listers with our sorters
export const lengthsortItems = createLister(byLength);
export const alphasortItems = createLister(fromStart);
export const alphasortItemsFromEnd = createLister(fromEnd);

// Sort by count is a bit different case so we'll do it separately
export const countsortItems = ({
  seed,
  unit,
  reverse,
  noDuplicates,
}: ListerProps) => {
  const counts = countItems(seed, unit);
  const returnItems = noDuplicates
    ? counts.map((item) => item.key)
    : counts.flatMap(({ key, count }) => Array(count).fill(key));
  if (reverse) {
    returnItems.reverse();
  }
  return returnItems.join(getJoiner(unit));
};

// Also, let's do shuffle with Fisher-Yates algorithm to get even distributions
export const shuffleItems = ({
  seed,
  unit,
  reverse,
  noDuplicates,
}: ListerProps) => {
  let items = textToItems(seed, unit);
  if (noDuplicates) {
    items = [...new Set(items)];
  }
  for (let i = items.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * i);
    [items[i], items[j]] = [items[j], items[i]];
  }
  if (reverse) {
    items.reverse();
  }
  return items.join(getJoiner(unit));
};

// Sort by softness of the letters (bit subjectively according to finnish pronounciation)
const softLetters = 'hjlmnvw';
const semiSoftLetters = 'aou';
const semiHarshLetters = 'bsyüäö';
const harshLetters = 'dkprt';

export const softnesssortItems = ({
  seed,
  unit,
  reverse,
  noDuplicates,
}: ListerProps) => {
  let items: string[] = textToItems(seed, unit);
  if (noDuplicates) {
    items = [...new Set(items)];
  }
  items = items
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
      // give small handicap to shorter items
      return {
        key: item,
        value: value / Math.log(Math.log(letters.length + 1) + 0.5),
      };
    })
    .sort((a, b) => b.value - a.value)
    .map((item) => item.key);
  if (reverse) {
    items.reverse();
  }
  return items.join(getJoiner(unit));
};