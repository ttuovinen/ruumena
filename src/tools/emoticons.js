// Random retro emoticons =O :P ;DD

const randomFrom = options => (options[Math.floor(Math.random() * options.length)])

const emoEyes = [':', ':', ':', ';', '=']
const emoMouths = [')', ')', ')', 'D', 'DD','(', 'O', 'P', '|', '/']

export const randomEmoticon = () => (
  `${randomFrom(emoEyes)}${randomFrom(emoMouths)}`
)

export const emoticonize = (seed) => {
    let newText = seed
    while (newText.match(/[.!?] /)) {
      newText = newText.replace(/[.!?] /, ` ${randomEmoticon()} `)
    }
    return (
      newText.split('\n').map(line => (
        line.replace(/[ \t]/g, '').length
          ? `${line} ${randomEmoticon()}`
          : line
      )).join('\n')
    )
  }
