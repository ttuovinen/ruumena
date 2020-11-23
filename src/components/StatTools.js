import React from 'react';
import PropTypes from 'prop-types';
import { by } from '../utils/metaUtils';
import { countCharacters, countLetters, countWords } from '../utils/statistics';
import Charts from './Chart';

const StatTools = ({ setOutputWith }) => {
  const handleCharCount = () => {
    setOutputWith(seed => (
      <ul>
        {countCharacters(seed).map(({ key, count, percent }) => (
          <li key={key}>{`'${key}' ${count} (${percent}%)`}</li>
        ))}
      </ul>
    ));
  };

  const handleLetterCount = () => {
    setOutputWith(seed => (
      <ul>
        {countLetters(seed).map(({ key, count, percent }) => (
          <li key={key}>{`'${key}' ${count} (${percent}%)`}</li>
        ))}
      </ul>
    ));
  };

  const handleWordCount = () => {
    setOutputWith(seed => {
      const counts = countWords(seed.toLowerCase());
      const wordlist = (
        <ul>
          {counts.map(({ key, count, percent }) => (
            <li key={key}>{`'${key}' ${count} (${percent}%)`}</li>
          ))}
        </ul>
      );
      const buckets = {};
      counts.forEach(({ count }) => {
        buckets[count] = (buckets[count] || 0) + 1;
      });
      const list2 = (
        <>
          Sanoja jotka esiintyvät...
          <ul>
            {Object.entries(buckets)
              .sort(by([1]))
              .reverse()
              .map(([item, count]) => (
                <li key={item}>
                  {item === '1' ? '1 kerran' : `${item} kertaa`}: {count}
                </li>
              ))}
          </ul>
        </>
      );
      return (
        <>
          <Charts data={counts} />
          {wordlist}
          {list2}
        </>
      );
    });
  };

  return (
    <div className="button-wrapper">
      <button type="button" onClick={handleCharCount}>
        Merkit
      </button>
      <button type="button" onClick={handleLetterCount}>
        Kirjaimet
      </button>
      <button type="button" onClick={handleWordCount}>
        Sanat
      </button>
    </div>
  );
};

StatTools.propTypes = {
  setOutputWith: PropTypes.func.isRequired,
};

export default StatTools;
