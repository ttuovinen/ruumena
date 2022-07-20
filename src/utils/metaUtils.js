// Function for creating sorter functions
export const createSorter = (preProcess) => (a, b) => {
  const [a2, b2] = [a, b].map((i) => preProcess(i));
  return (a2 > b2) - (a2 < b2);
};

// And while we're on it, let's create and export a handy general purpose sorter
export const by = (key) => createSorter((i) => i[key]);

// Regex for detecting non-space-or-alphanumeric characters
export const specialChars = /[^ a-záàâäãåßçéèêëíìîïñóòôöõúùûüýÿæœ0-9]/gi;

// Regex for detecting non-letters
export const nonLetters = /[^a-záàâäãåßçéèêëíìîïñóòôöõúùûüýÿæœ]/gi;

// Regex for detecting sentence breaks
// TMP: Crude workaround while waiting for
// Safari to implement regex lookbehind
let sentenceBreaks1;
try {
  sentenceBreaks1 = new RegExp(
    `(?<=[.?!…])\\s+(?=[A-ZÁÀÂÄÃÅÇÉÈÊËÍÌÎÏÑÓÒÔÖÕÚÙÛÜÝŸÆŒ])`,
    'g'
  );
} catch (err) {
  // Sub-par fallback which removes periods ect. from sentence ends
  sentenceBreaks1 = /(?:[.?!…])\s+(?=[A-ZÁÀÂÄÃÅÇÉÈÊËÍÌÎÏÑÓÒÔÖÕÚÙÛÜÝŸÆŒ])/g;
}

export const sentenceBreaks = sentenceBreaks1;

// voc / cons tools
const vocals = 'aeiouyáàâäãåéèêëíìîïóòôöõúùûüýÿæœ'.split('');
const consonants = 'bcdfghjklmnpqrstvwxzßçñ'.split('');
export const isVocal = (letter) => vocals.includes(letter.toLowerCase());
export const isConsonant = (letter) =>
  consonants.includes(letter.toLowerCase());

// Process input text into array of words
const textToWords = (seed) =>
  seed
    .replace(/\s+/g, ' ')
    .replace(specialChars, '')
    .toLowerCase()
    .split(' ')
    .filter((item) => item);

// Process input text into array of lines
const textToLines = (seed) =>
  seed
    .split('\n')
    .map((item) => item.trim())
    .filter((item) => item);

// Process input text into array of sentences
const textToSentences = (seed) =>
  seed
    .split(sentenceBreaks)
    .map((item) => item.trim())
    .filter((item) => item);

// Process input text into array of characters
const textToCharacters = (seed) =>
  seed.replaceAll('\n', '⏎').replaceAll('\t', '⇒').split('');

// Process input text into array of letters
const textToLetters = (seed) =>
  seed.toLowerCase().replace(nonLetters, '').split('');

export const textToItems = (seed, unit) => {
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
