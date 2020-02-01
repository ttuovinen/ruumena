/* Function for creating sorter functions */
export const createSorter = preProcess => (a, b) => {
  const [a2, b2] = [a, b].map(i => preProcess(i));
  return (a2 > b2) - (a2 < b2);
};

/* And while we're on it, let's create and export a handy general purpose sorter */
export const by = key => createSorter(i => i[key]);

/* A nice international regex for detecting non-space-or-alphanumeric characters */
export const specialChars = /[^ a-zA-ZáàâäãåçéèêëíìîïñóòôöõúùûüýÿæœÁÀÂÄÃÅÇÉÈÊËÍÌÎÏÑÓÒÔÖÕÚÙÛÜÝŸÆŒ0-9]/g;

/* Function for processing input text into array of words */
export const textToWords = seed =>
  seed
    .replace(/\s+/g, ' ')
    .replace(specialChars, '')
    .toLowerCase()
    .split(' ')
    .filter(word => word); // remove empty strings
