import { capitalize, isLowerCaseLetter } from './metaUtils';

// Brute enforcing and reverting of Grimm's law -esque consonant shifts
// (for entertainment purposes only)

const SHIFTS: Record<string, string> = {
  p: 'f',
  t: 'þ',
  k: 'h',
  b: 'p',
  d: 't',
  g: 'k',
};

const DOUBLE_SHIFTS: Record<string, string> = {
  bh: 'b',
  dh: 'd',
  gh: 'g',
};

const UNSHIFTS = Object.entries(SHIFTS).reduce(
  (soFar: Record<string, string>, [key, value]) => {
    soFar[value] = key;
    return soFar;
  },
  {}
);

const DOUBLE_UNSHIFTS = Object.entries(DOUBLE_SHIFTS).reduce(
  (soFar: Record<string, string>, [key, value]) => {
    soFar[value] = key;
    return soFar;
  },
  {}
);

const TOTAL_UNSHIFTS = { ...UNSHIFTS, ...DOUBLE_UNSHIFTS };

const shift = (input: string, index: number, array: string[]): string => {
  if (
    input.toLowerCase() === 'h' &&
    ['b', 'd', 'g'].includes(array[index - 1]?.toLowerCase())
  ) {
    return '';
  }
  const output = SHIFTS[input.toLowerCase()];
  if (output) {
    if (
      ['b', 'd', 'g'].includes(array[index].toLowerCase()) &&
      array[index + 1]?.toLowerCase() === 'h'
    ) {
      return input;
    }
    return isLowerCaseLetter(input) ? output : output.toUpperCase();
  }
  return input;
};

const unshift = (input: string, index: number, array: string[]) => {
  const output = TOTAL_UNSHIFTS[input.toLowerCase()];
  if (
    output &&
    !(output.length > 1 && array[index + 1]?.toLowerCase() === 'h') &&
    !(
      input.toLowerCase() === 'h' &&
      ['b', 'd', 'g'].includes(array[index - 1]?.toLowerCase())
    )
  ) {
    if (isLowerCaseLetter(input)) {
      return output;
    }
    return array.length > index && isLowerCaseLetter(array[index + 1])
      ? capitalize(output)
      : output.toUpperCase();
  }
  return input;
};

export const grimmify = (seed: string) => {
  return seed.split('').map(shift).join('');
};

export const ungrimmify = (seed: string) => {
  return seed.split('').map(unshift).join('');
};
