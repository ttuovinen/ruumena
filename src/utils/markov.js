const randomFrom = arr => arr[Math.floor(Math.random() * arr.length)];

const getSafeBeginning = (chain, nSize, beginning) => {
  const chainKeys = Object.keys(chain);
  // if no beginning given use random gram (preferably upper case)
  if (!beginning)
    return (
      randomFrom(
        chainKeys.filter(
          item =>
            item.charAt(0) === item.charAt(0).toUpperCase() &&
            item.charAt(0) !== item.charAt(0).toLowerCase()
        )
      ) || randomFrom(chainKeys)
    );

  // if beginning shorter than nSize
  if (beginning.length < nSize) {
    let options = chainKeys.filter(item => item.startsWith(beginning));
    // best case: beginning exists in some gram
    if (options.length) return randomFrom(options);
    // 2nd best case: beginning exists in grams in other cases
    options = chainKeys.filter(item =>
      item.toLowerCase().startsWith(beginning.toLowerCase())
    );
    if (options.length) return randomFrom(options);
  }
  if (beginning.length >= nSize) {
    const beginGram = beginning.substr(-1 * nSize, nSize);
    // best case: beginGram in grams
    if (chainKeys[beginGram]) return beginning;
    // 2nd best case: beginning exists in grams in other cases
    const options = chainKeys.filter(
      item => item.toLowerCase() === beginGram.toLowerCase()
    );
    if (options.length) {
      return `${beginning.substr(0, beginning.length - nSize)}${randomFrom(
        options
      )}`;
    }
  }
  // if all else fails
  return `${beginning}${randomFrom(chainKeys.filter(item => item[0] === ' ')) ||
    randomFrom(chainKeys)}`;
};

const buildChain = (seed, nSize) => {
  const chain = {};
  for (let i = 0; i <= seed.length - nSize; i += 1) {
    const gram = seed.substring(i, i + nSize);
    const next = seed.charAt(i + nSize);
    if (!chain[gram]) chain[gram] = [];
    chain[gram].push(next);
  }
  return chain;
};

export const markovMe = (seed, nSize = 5, outputSize = 200, beginning) => {
  const chain = buildChain(seed, nSize);
  let result = getSafeBeginning(chain, nSize, beginning);
  for (let i = 0; i <= outputSize; i += 1) {
    const gram = result.substr(-1 * nSize, nSize);
    const nextChar = chain[gram] ? randomFrom(chain[gram]) : ' ';
    result += nextChar;
  }
  return result.substring(0, result.lastIndexOf(' '));
};
