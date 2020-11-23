import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
  lengthsortWords,
  alphasortWords,
  alphasortWordsFromEnd,
  countsortWords,
  shuffleWords,
} from '../utils/wordSorters';

const SortTools = ({ setOutputWith }) => {
  const [reverse, setReverse] = useState(false);
  const [noDuplicates, setNoDuplicates] = useState(false);

  const handleSortWords = wordSorter =>
    setOutputWith(seed =>
      wordSorter({
        seed,
        reverse,
        noDuplicates,
      })
    );

  return (
    <>
      <div className="options-wrapper">
        <label className="checkbox-label" htmlFor="reverse">
          <input
            type="checkbox"
            id="reverse"
            checked={reverse}
            onChange={() => setReverse(!reverse)}
          />
          takaperin
        </label>
        <label className="checkbox-label" htmlFor="no-duplicates">
          <input
            type="checkbox"
            id="no-duplicates"
            checked={noDuplicates}
            onChange={() => setNoDuplicates(!noDuplicates)}
          />
          kukin sana vain kerran
        </label>
      </div>
      <div className="button-wrapper">
        <button type="button" onClick={() => handleSortWords(alphasortWords)}>
          Aakkosta
        </button>
        <button
          type="button"
          onClick={() => handleSortWords(alphasortWordsFromEnd)}
        >
          Aakkosta lopusta
        </button>
        <button type="button" onClick={() => handleSortWords(lengthsortWords)}>
          Pituuden mukaan
        </button>
        <button type="button" onClick={() => handleSortWords(countsortWords)}>
          Esiintymien mukaan
        </button>
        <button type="button" onClick={() => handleSortWords(shuffleWords)}>
          Sekoita
        </button>
      </div>
    </>
  );
};

SortTools.propTypes = {
  setOutputWith: PropTypes.func.isRequired,
};

export default SortTools;
