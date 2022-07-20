import React from 'react';
import PropTypes from 'prop-types';
import { by, isVocal, textToItems } from '../utils/metaUtils';
import { countItems, percentFrom } from '../utils/statistics';
import Charts from './Chart';
import { SetOutputFunction, UnitOptions } from '../types/types';
import HorizontalBarChart from './HorizontalBarChart';

interface Props {
  setOutputWith: SetOutputFunction;
  unit: UnitOptions;
}

const StatTools = ({ setOutputWith }: Props) => {
  const handleCharCount = () => {
    setOutputWith((seed: string) => {
      const counts = countItems(seed.toLowerCase(), 'char').filter(
        (item) => item.key
      );
      return (
        <>
          <h2>Merkit</h2>
          <HorizontalBarChart data={counts} />
        </>
      );
    });
  };

  const handleLetterCount = () => {
    setOutputWith((seed: string) => {
      const counts = countItems(seed.toLowerCase(), 'letter');
      const totalCount = counts.reduce((soFar, cur) => soFar + cur.count, 0);
      const vocalCount = counts
        .filter((item) => isVocal(item.key))
        .reduce((soFar, cur) => soFar + cur.count, 0);
      const consonantCount = totalCount - vocalCount;

      const buckets: Record<string, number> = {};
      counts.forEach(({ count }) => {
        buckets[count] = (buckets[count] || 0) + 1;
      });

      return (
        <>
          <h2>Kirjaimet</h2>
          <p>
            yht. {totalCount}, vokaaleita {vocalCount}, konsonantteja{' '}
            {consonantCount}
          </p>
          <HorizontalBarChart data={counts} />
        </>
      );
    });
  };

  const handleWordCount = () => {
    setOutputWith((seed: string) => {
      const words = textToItems(seed, 'word');
      const counts = countItems(seed.toLowerCase(), 'word');
      const lenghts: Record<number, number> = {};
      words.forEach((word: string) => {
        lenghts[word.length] = (lenghts[word.length] || 0) + 1;
      });
      const lengthData = Object.entries(lenghts).map(([key, value]) => ({
        key: key.length < 2 ? ' ' + key : key,
        count: value,
        percent: percentFrom(value, words.length),
      }));

      const meanLength =
        Math.round(
          (words.reduce((soFar: number, cur: string) => soFar + cur.length, 0) /
            words.length) *
            100
        ) / 100;
      const wordlist = (
        <ul>
          {counts.map(({ key, count, percent }) => (
            <li key={key}>{`'${key}' ${count} (${percent}%)`}</li>
          ))}
        </ul>
      );
      const buckets: Record<string, number> = {};
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
          <h2>Sanat</h2>
          yhteensä {words.length}, keskipituus: {meanLength}
          <HorizontalBarChart data={lengthData} />
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
