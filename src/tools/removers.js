
/* From 'rawText' input string, replaces every
   'removeN':th word's  characters with ____'s
   starting from 'removeOffset':th word */
export const removeConstantWords = ({ rawText, removeN, removeOffset }) => {
    let curOffset = removeOffset
    return (
        rawText
            .replace(/\n/g, '\n ') // new word on line break
            .split(' ')
            .filter(word => word) // remove empty strings
            .map((word, idx) => {
                if (word.replace(/\s/g, '').length === 0) {
                    curOffset++ // skip non-words like empty lines
                    return word
                }
                return (((idx % removeN) - ((curOffset - 1) % removeN) === 0) && (idx >= curOffset - 1))
                    ? word.replace(/./g, '_') : word
            })
            .join(' ')
            .replace(/\n /g, '\n') // remove earlier added spaces
    )
}

/* From 'rawText' input string, replaces each word's 
   characters with ____'s by 'removePercent' change % */
export const removeRandomWords = ({ rawText, removePercent }) => (
    rawText
        .replace(/\n/g, '\n ') // new word on line break
        .split(' ')
        .filter(word => word) // remove empty strings
        .map(word => {
            if (word.replace(/\s/g, '').length === 0) {
                return word // skip non-words like empty lines
            }
            return (Math.random() < removePercent / 100)
                ? word.replace(/./g, '_')
                : word
        })
        .join(' ')
        .replace(/\n /g, '\n') // remove earlier added spaces
)

