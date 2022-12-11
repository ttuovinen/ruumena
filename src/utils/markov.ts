import { randomFrom } from './metaUtils';

type Chain = Record<string, string[]>;

const isLowerCaseLetter = (char: string) =>
  char === char.toLowerCase() && char !== char.toUpperCase();

const isUpperCaseLetter = (char: string) =>
  char === char.toUpperCase() && char !== char.toLowerCase();

const getSafeBeginning = (chain: Chain, nSize: number, beginning: string) => {
  const chainKeys = Object.keys(chain);
  // if no beginning given use random gram (which preferably starts with uppercase)
  if (!beginning)
    return (
      randomFrom(
        chainKeys.filter(
          (item) => isUpperCaseLetter(item[0]) && isLowerCaseLetter(item[1])
        )
      ) || randomFrom(chainKeys)
    );

  // if beginning shorter than nSize
  if (beginning.length < nSize) {
    let options = chainKeys.filter((item) => item.startsWith(beginning));
    // best case: beginning exists in some gram
    if (options.length) return randomFrom(options);
    // 2nd best case: beginning exists in grams in other cases
    options = chainKeys.filter((item) =>
      item.toLowerCase().startsWith(beginning.toLowerCase())
    );
    if (options.length) return randomFrom(options);
  }
  if (beginning.length >= nSize) {
    const beginGram = beginning.substring(-1 * nSize, nSize);
    // best case: beginGram in grams
    if (chainKeys.includes(beginGram)) return beginning;
    // 2nd best case: beginning exists in grams in other cases
    const options = chainKeys.filter(
      (item) => item.toLowerCase() === beginGram.toLowerCase()
    );
    if (options.length) {
      return `${beginning.substr(0, beginning.length - nSize)}${randomFrom(
        options
      )}`;
    }
  }
  // if all else fails
  return `${beginning}${
    randomFrom(chainKeys.filter((item) => item[0] === ' ')) ||
    randomFrom(chainKeys)
  }`;
};

const buildChain = (seed: string, nSize: number) => {
  const chain: Chain = {};
  for (let i = 0; i <= seed.length - nSize; i += 1) {
    const gram = seed.substring(i, i + nSize);
    const next = seed.charAt(i + nSize);
    if (!chain[gram]) chain[gram] = [];
    chain[gram].push(next);
  }
  return chain;
};

export const markovMe = (
  seed: string,
  nSize = 5,
  outputSize = 200,
  beginning: string
) => {
  if (seed.length < nSize) return seed;
  const chain = buildChain(seed, nSize);
  let result = getSafeBeginning(chain, nSize, beginning);
  for (let i = 0; i <= outputSize; i += 1) {
    const gram = result.substr(-1 * nSize, nSize);
    const nextChar =
      randomFrom(chain[gram]) ||
      // if we hit the last gram, let's try to start a new sentence
      ` ${
        randomFrom(
          Object.keys(chain).filter(
            (item) => isUpperCaseLetter(item[0]) && isLowerCaseLetter(item[1])
          )
        ) || randomFrom(Object.keys(chain))
      }`;
    result += nextChar;
  }
  return result.lastIndexOf(' ') > 0
    ? result.substring(0, result.lastIndexOf(' '))
    : result;
};
