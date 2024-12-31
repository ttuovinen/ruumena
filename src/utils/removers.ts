import { FilterType, Unit } from '../types/types';
import { sentenceBreaks, specialChars } from './metaUtils';

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
  filterType: FilterType;
  filterText: string;
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
    .filter(Boolean)
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
    .filter(Boolean)
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
    .filter(Boolean)
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
    .filter(Boolean)
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
    .filter((item) => replaceWith || item)
    .join('\n');

const removeRandomSentences = ({
  seed,
  removePercent,
  replaceWith = '_',
}: RemoveRandomArgs) =>
  seed
    .split(sentenceBreaks)
    .map(removeRandomly(removePercent, replaceWith))
    .filter((item) => replaceWith || item)
    .join(' ');

// From 'seed' input string, removes item / replaces each item's
// characters with ____'s if it matches condition and filterText
interface FilterFunctionArgs {
  item: string;
  filters: string[];
}

const filterFunctions = {
  [FilterType.includes]: ({ item, filters }: FilterFunctionArgs) =>
    !filters.some((filter) => item.toLowerCase().includes(filter)),
  [FilterType.excludes]: ({ item, filters }: FilterFunctionArgs) =>
    filters.some((filter) => item.toLowerCase().includes(filter)),
  [FilterType.startsWith]: ({ item, filters }: FilterFunctionArgs) =>
    !filters.some((filter) => item.toLowerCase().startsWith(filter)),
  [FilterType.notStartsWith]: ({ item, filters }: FilterFunctionArgs) =>
    filters.some((filter) => item.toLowerCase().startsWith(filter)),
  [FilterType.endsWith]: ({ item, filters }: FilterFunctionArgs) =>
    !filters.some((filter) => item.toLowerCase().endsWith(filter)),
  [FilterType.notEndsWith]: ({ item, filters }: FilterFunctionArgs) =>
    filters.some((filter) => item.toLowerCase().endsWith(filter)),
};

const removeFilteredWords = ({
  seed,
  filterType,
  filterText,
  replaceWith = '',
}: RemoveFilteredArgs) => {
  const filters = filterText.toLowerCase().split(' ').filter(Boolean);

  return seed
    .replace(/\n/g, '\n ') // new word on line break
    .split(' ')
    .map((item) =>
      filterFunctions[filterType]({
        filters,
        item: item.replace(specialChars, ''),
      })
        ? item
        : item.replace(/./g, replaceWith)
    )
    .filter(Boolean)
    .join(' ')
    .replace(replaceWith ? /\n /g : /\n\s+/g, '\n'); // remove earlier added spaces (and multilinebreaks if no replace)
};

const removeFilteredLines = ({
  seed,
  filterType,
  filterText,
  replaceWith = '',
}: RemoveFilteredArgs) => {
  const filters = filterText.toLowerCase().split(' ').filter(Boolean);

  return seed
    .split('\n')
    .map((item) =>
      filterFunctions[filterType]({ filters, item })
        ? item
        : item.replace(/./g, replaceWith)
    )
    .filter(Boolean)
    .join('\n');
};

const removeFilteredSentences = ({
  seed,
  filterType,
  filterText,
  replaceWith = '',
}: RemoveFilteredArgs) => {
  const filters = filterText.toLowerCase().split(' ').filter(Boolean);

  return seed
    .split(sentenceBreaks)
    .map((item) =>
      filterFunctions[filterType]({ filters, item })
        ? item
        : item.replace(/./g, replaceWith)
    )
    .filter(Boolean)
    .join(' ');
};

export const removeConstantItems = ({
  unit,
  ...props
}: BaseRemoveArgs & RemoveConstantArgs) => {
  switch (unit) {
    case Unit.sentence:
      return removeConstantSentences(props);

    case Unit.line:
      return removeConstantLines(props);

    case Unit.word:
    default:
      return removeConstantWords(props);
  }
};

export const removeRandomItems = ({
  unit,
  ...props
}: BaseRemoveArgs & RemoveRandomArgs) => {
  switch (unit) {
    case Unit.sentence:
      return removeRandomSentences(props);

    case Unit.line:
      return removeRandomLines(props);

    case Unit.word:
    default:
      return removeRandomWords(props);
  }
};

export const removeFilteredItems = ({
  unit,
  ...props
}: BaseRemoveArgs & RemoveFilteredArgs) => {
  switch (unit) {
    case Unit.sentence:
      return removeFilteredSentences(props);

    case Unit.line:
      return removeFilteredLines(props);

    case Unit.word:
    default:
      return removeFilteredWords(props);
  }
};
