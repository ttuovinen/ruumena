/* Function for creating sorter functions */
const CreateSorter = (preProcess) => (a, b) => {
    const [a2, b2] = [a, b].map(i => (
        preProcess(i)
    ))
    return a2 < b2 ? -1 : a2 > b2 ? 1 : 0
}

/* Let's create a bunch of them */
const byLength = CreateSorter(i => i.length)
const fromStart = CreateSorter(i => i.toLowerCase())
const fromEnd = CreateSorter(i => [...i.toLowerCase()].reverse().join(''))
const shuffle = CreateSorter(i => Math.random() - 0.5)

/* A nice international regex for detecting non-space-or-alphanumeric characters */
const specialChars = /[^ a-zA-ZáàâäãåçéèêëíìîïñóòôöõúùûüýÿæœÁÀÂÄÃÅÇÉÈÊËÍÌÎÏÑÓÒÔÖÕÚÙÛÜÝŸÆŒ0-9]/g

/* Function for creating wordlist functions */
const CreateWordlister = (sorter) => (seed, reverse, noDuplicates) => {
    let words = seed
        .replace(/\s+/g, ' ')
        .replace(specialChars, '')
        .toLowerCase()
        .split(' ')
        .filter(word => word) // remove empty strings
        .sort(sorter)
    if (reverse) { words = words.reverse() }
    if (noDuplicates) { words = [...new Set(words)] }
    return words.join(' ')
}

/* Let's create also a bunch of wordlisters and export them */
export const lengthsortWords = CreateWordlister(byLength)
export const alphasortWords = CreateWordlister(fromStart)
export const alphasortWordsFromEnd = CreateWordlister(fromEnd)
export const shuffleWords = CreateWordlister(shuffle)
