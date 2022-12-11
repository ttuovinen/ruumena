import { Unit } from '../types/types';
import { sentenceBreaks } from './metaUtils';

type BaseRemoveArgs = {
  unit: Unit;
};
type RemoveConstantArgs = {
  seed: string;
  removeN: number;
  removeOffset: number;
  replaceWith?: string;
};
type RemoveRandomArgs = {
  seed: string;
  removePercent: number;
  replaceWith?: string;
};
type RemoveFilteredArgs = {
  seed: string;
  filterText: string;
  include: boolean;
  replaceWith?: string;
};

// Mapping functions
const removeRandomly =
  (removePercent: number, replaceWith: string) => (item: string) => {
    if (item.replace(/\s/g, '').length === 0) {
      return item;
    }
    return Math.random() < removePercent / 100
      ? item.replace(/./g, replaceWith)
      : item;
  };

// From 'seed' input string, replaces every
// 'removeN':th item's  characters with ____'s
// starting from 'removeOffset':th item
export const removeConstantWords = ({
  seed,
  removeN,
  removeOffset,
  replaceWith = '_',
}: RemoveConstantArgs) => {
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
    .filter((word: any) => word)
    .join(' ')
    .replace(replaceWith ? /\n /g : /\n\s+/g, '\n'); // remove earlier added spaces (and multilinebreaks if no replace)
};

export const removeConstantLines = ({
  seed,
  removeN,
  removeOffset,
  replaceWith = '_',
}: RemoveConstantArgs) => {
  let curOffset = removeOffset;
  return seed
    .split('\n')
    .map((item, idx) => {
      if (item.replace(/\s/g, '').length === 0) {
        curOffset += 1; // skip non-items like empty lines
        return item;
      }
      return (idx % removeN) - ((curOffset - 1) % removeN) === 0 &&
        idx >= curOffset - 1
        ? item.replace(/./g, replaceWith)
        : item;
    })
    .filter((item: any) => item)
    .join('\n');
};

export const removeConstantSentences = ({
  seed,
  removeN,
  removeOffset,
  replaceWith = '_',
}: RemoveConstantArgs) => {
  let curOffset = removeOffset;
  return seed
    .split(sentenceBreaks)
    .map((item, idx) => {
      if (item.replace(/\s/g, '').length === 0) {
        curOffset += 1; // skip non-items like empty lines
        return item;
      }
      return (idx % removeN) - ((curOffset - 1) % removeN) === 0 &&
        idx >= curOffset - 1
        ? item.replace(/./g, replaceWith)
        : item;
    })
    .filter((item: any) => item)
    .join(' ');
};

// From 'seed' input string, replaces each item's
// characters with ____'s by 'removePercent' change %
const removeRandomWords = ({
  seed,
  removePercent,
  replaceWith = '_',
}: RemoveRandomArgs) =>
  seed
    .replace(/\n/g, '\n ') // new word on line break
    .split(' ')
    .map(removeRandomly(removePercent, replaceWith))
    .filter((item: any) => item)
    .join(' ')
    .replace(replaceWith ? /\n /g : /\n\s+/g, '\n'); // remove earlier added spaces (and multilinebreaks if no replace)

const removeRandomLines = ({
  seed,
  removePercent,
  replaceWith = '_',
}: RemoveRandomArgs) =>
  seed
    .split('\n')
    .map(removeRandomly(removePercent, replaceWith))
    .filter((item: any) => replaceWith || item)
    .join('\n');

const removeRandomSentences = ({
  seed,
  removePercent,
  replaceWith = '_',
}: RemoveRandomArgs) =>
  seed
    .split(sentenceBreaks)
    .map(removeRandomly(removePercent, replaceWith))
    .filter((item: any) => replaceWith || item)
    .join(' ');

// From 'seed' input string, removes item / replaces each item's
// characters with ____'s if it includes/exludes filterText
const removeFilteredWords = ({
  seed,
  filterText,
  include,
  replaceWith = '',
}: RemoveFilteredArgs) => {
  const filters = filterText
    .toLowerCase()
    .split(' ')
    .filter((item: any) => item);

  return seed
    .replace(/\n/g, '\n ') // new word on line break
    .split(' ')
    .map((word: string) =>
      (
        filters.some((string: any) => word.toLowerCase().includes(string))
          ? !include
          : include
      )
        ? word
        : word.replace(/./g, replaceWith)
    )
    .filter((word: any) => word)
    .join(' ')
    .replace(replaceWith ? /\n /g : /\n\s+/g, '\n'); // remove earlier added spaces (and multilinebreaks if no replace)
};

const removeFilteredLines = ({
  seed,
  filterText,
  include,
  replaceWith = '',
}: RemoveFilteredArgs) => {
  const filters = filterText
    .toLowerCase()
    .split(' ')
    .filter((item: any) => item);

  return seed
    .split('\n')
    .map((item: string) =>
      (
        filters.some((string: any) => item.toLowerCase().includes(string))
          ? !include
          : include
      )
        ? item
        : item.replace(/./g, replaceWith)
    )
    .filter((item: any) => item)
    .join('\n');
};

const removeFilteredSentences = ({
  seed,
  filterText,
  include,
  replaceWith = '',
}: RemoveFilteredArgs) => {
  const filters = filterText
    .toLowerCase()
    .split(' ')
    .filter((item: any) => item);

  return seed
    .split(sentenceBreaks)
    .map((item: string) =>
      (
        filters.some((string: any) => item.toLowerCase().includes(string))
          ? !include
          : include
      )
        ? item
        : item.replace(/./g, replaceWith)
    )
    .filter((item: any) => item)
    .join(' ');
};

export const removeConstantItems = ({
  unit,
  ...props
}: BaseRemoveArgs & RemoveConstantArgs) => {
  switch (unit) {
    case 'sentence':
      return removeConstantSentences(props);

    case 'line':
      return removeConstantLines(props);

    case 'word':
    default:
      return removeConstantWords(props);
  }
};

export const removeRandomItems = ({
  unit,
  ...props
}: BaseRemoveArgs & RemoveRandomArgs) => {
  switch (unit) {
    case 'sentence':
      return removeRandomSentences(props);

    case 'line':
      return removeRandomLines(props);

    case 'word':
    default:
      return removeRandomWords(props);
  }
};

export const removeFilteredItems = ({
  unit,
  ...props
}: BaseRemoveArgs & RemoveFilteredArgs) => {
  switch (unit) {
    case 'sentence':
      return removeFilteredSentences(props);

    case 'line':
      return removeFilteredLines(props);

    case 'word':
    default:
      return removeFilteredWords(props);
  }
};
