/* Function for creating sorter functions */
const createSorter = preProcess => (a, b) => {
  const [a2, b2] = [a, b].map(i => (
    preProcess(i)
  ))
  return a2 < b2 ? -1 : a2 > b2 ? 1 : 0
}

/* Let's create a bunch of them */
const byLength = createSorter(i => i.length)
const fromStart = createSorter(i => i.toLowerCase())
const fromEnd = createSorter(i => [...i.toLowerCase()].reverse().join(''))
const shuffle = createSorter(i => Math.random() - 0.5)

/* A nice international regex for detecting non-space-or-alphanumeric characters */
const specialChars = /[^ a-zA-ZáàâäãåçéèêëíìîïñóòôöõúùûüýÿæœÁÀÂÄÃÅÇÉÈÊËÍÌÎÏÑÓÒÔÖÕÚÙÛÜÝŸÆŒ0-9]/g

/* Function for creating wordlist functions */
const createWordLister = sorter => ({ seed, reverse, noDuplicates }) => {
  let words = seed
    .replace(/\s+/g, ' ')
    .replace(specialChars, '')
    .toLowerCase()
    .split(' ')
    .filter(word => word) // remove empty strings
    .sort(sorter)
  if (noDuplicates) { words = [...new Set(words)] }
  if (reverse) { words = words.reverse() }
  return words.join(' ')
}

/* Let's create also a bunch of word listers with our sorters and export them */
export const lengthsortWords = createWordLister(byLength)
export const alphasortWords = createWordLister(fromStart)
export const alphasortWordsFromEnd = createWordLister(fromEnd)
export const shuffleWords = createWordLister(shuffle)
