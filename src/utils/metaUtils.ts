export const randomFrom = (options: any[]) =>
  options[Math.floor(Math.random() * options.length)];

// Function for creating sorter functions
export const createSorter =
  (preProcess: { (i: string): any }) => (a: any, b: any) => {
    const [a2, b2] = [a, b].map((i) => preProcess(i));
    return typeof a2 === 'string' && typeof b2 === 'string'
      ? a2.localeCompare(b2, 'FI-fi')
      : Number(a2) - Number(b2);
  };

// General purpose sorter
export const by = (key: string) => createSorter((i: any) => i[key]);

// Regex for detecting non-space-or-alphanumeric characters
export const specialChars = /[^ a-záàâäãåßçéèêëíìîïñóòôöõúùûüýÿæœ0-9]/gi;

// Regex for detecting non-letters
export const nonLetters = /[^a-záàâäãåßçéèêëíìîïñóòôöõúùûüýÿæœ]/gi;

// Regex for detecting sentence breaks
// TMP: Crude workaround while waiting for
// Safari to implement regex lookbehind
let regexLookbehindSupported = true;
export const isLookbehindSupported = () => regexLookbehindSupported;

let sentenceBreaks1;
try {
  sentenceBreaks1 = new RegExp(
    `(?<=[.?!…])\\s+(?=[A-ZÁÀÂÄÃÅÇÉÈÊËÍÌÎÏÑÓÒÔÖÕÚÙÛÜÝŸÆŒ])`,
    'g'
  );
} catch (err) {
  regexLookbehindSupported = false;
  console.warn(
    'This browser does not support regex lookbehind. Using sub-par fallback for sentence breaks.'
  );
  // Sub-par fallback which removes periods ect. from sentence ends
  sentenceBreaks1 = /(?:[.?!…])\s+(?=[A-ZÁÀÂÄÃÅÇÉÈÊËÍÌÎÏÑÓÒÔÖÕÚÙÛÜÝŸÆŒ])/g;
}

export const sentenceBreaks = sentenceBreaks1;

// Vowel/consonsonant tools
const vowels = 'aeiouyáàâäãåéèêëíìîïóòôöõúùûüýÿæœ';
const consonants = 'bcdfghjklmnpqrstvwxzßçñ';
export const isVowel = (letter: string) =>
  vowels.includes(letter.toLowerCase());
export const isConsonant = (letter: string) =>
  consonants.includes(letter.toLowerCase());

// Process input text into array of words
const textToWords = (seed: string) =>
  seed
    .replace(/\s+/g, ' ')
    .replace(specialChars, '')
    .toLowerCase()
    .split(' ')
    .filter(Boolean);

// Process input text into array of lines
const textToLines = (seed: string) =>
  seed
    .split('\n')
    .map((item) => item.trim())
    .filter(Boolean);

// Process input text into array of sentences
const textToSentences = (seed: string) =>
  seed
    .split(sentenceBreaks)
    .map((item) => item.trim())
    .filter(Boolean);

// Process input text into array of characters
const textToCharacters = (seed: string) =>
  seed.replaceAll('\n', '⏎').replaceAll('\t', '⇒').split('');

// Process input text into array of letters
const textToLetters = (seed: string) =>
  seed.toLowerCase().replace(nonLetters, '').split('');

export const textToItems = (seed: string, unit: string) => {
  switch (unit) {
    case 'sentence':
      return textToSentences(seed);

    case 'line':
      return textToLines(seed);

    case 'char':
      return textToCharacters(seed);

    case 'letter':
      return textToLetters(seed);

    case 'word':
    default:
      return textToWords(seed);
  }
};

/* general math helpers */
export const mapToScale = (
  num: number,
  inMin: number,
  inMax: number,
  outMin: number,
  outMax: number
) => ((num - inMin) * (outMax - outMin)) / (inMax - inMin) + outMin;
