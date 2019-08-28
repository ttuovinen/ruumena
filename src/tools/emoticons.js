// Random retro emoticons =O :P ;DD

const randomFrom = options => (options[Math.floor(Math.random() * options.length)])

const emoEyes = [':', ':', ':', ';', '=']
const emoMouths = [')', ')', ')', 'D', 'DD','(', 'O', 'P', '|', '/']

export const randomEmoticon = () => (
  `${randomFrom(emoEyes)}${randomFrom(emoMouths)}`
)
