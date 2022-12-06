import { isVowel, textToItems } from '../utils/metaUtils';
import { countItems, percentFrom } from '../utils/statistics';
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
      const totalCount = counts.reduce((soFar, cur) => soFar + cur.count, 0);
      return (
        <div className="text-center">
          <h2 className="output-title">Merkit</h2>
          Yhteensä {totalCount} merkkiä (ml. rivinvaihdot)
          <h3 className="output-subtitle">Merkkien esiintymismäärät</h3>
          <HorizontalBarChart data={counts} />
        </div>
      );
    });
  };

  const handleLetterCount = () => {
    setOutputWith((seed: string) => {
      const counts = countItems(seed.toLowerCase(), 'letter');
      const totalCount = counts.reduce((soFar, cur) => soFar + cur.count, 0);
      const vowelCount = counts
        .filter((item) => isVowel(item.key))
        .reduce((soFar, cur) => soFar + cur.count, 0);
      const consonantCount = totalCount - vowelCount;

      const buckets: Record<string, number> = {};
      counts.forEach(({ count }) => {
        buckets[count] = (buckets[count] || 0) + 1;
      });

      return (
        <div className="text-center">
          <h2 className="output-title">Kirjaimet</h2>
          <p>Yhteensä {totalCount} kirjainta, joista </p>
          <ul>
            <li>
              vokaaleita {vowelCount} ({percentFrom(vowelCount, totalCount)}%)
            </li>
            <li>
              konsonantteja {consonantCount} (
              {percentFrom(consonantCount, totalCount)}%)
            </li>
          </ul>
          <h3 className="output-subtitle">Kirjainten esiintymismäärät</h3>
          <HorizontalBarChart data={counts} />
        </div>
      );
    });
  };

  const handleWordCount = () => {
    setOutputWith((seed: string) => {
      const words = textToItems(seed, 'word');
      const uniqueWordsTotal = [...new Set(words)].length;
      const counts = countItems(seed.toLowerCase(), 'word');
      const lenghtBuckets: Record<number, string[]> = {};
      words.forEach((word: string) => {
        lenghtBuckets[word.length] = [
          ...(lenghtBuckets[word.length] || []),
          word,
        ];
      });
      const lengthData = Object.entries(lenghtBuckets).map(([key, items]) => ({
        key,
        count: items.length,
        percent: percentFrom(items.length, words.length),
        items: items,
      }));
      const meanLength =
        Math.round(
          (words.reduce((soFar: number, cur: string) => soFar + cur.length, 0) /
            words.length) *
            100
        ) / 100;

      const countBuckets: Record<number, string[]> = {};
      counts.forEach(({ key, count }) => {
        countBuckets[count] = [...(countBuckets[count] || []), key];
      });

      const countData = Object.entries(countBuckets)
        .map(([key, items]) => ({
          key,
          count: items.length,
          percent: percentFrom(items.length, uniqueWordsTotal),
          items: items,
        }))
        .reverse();

      const meanCount =
        Math.round(
          (countData.reduce(
            (soFar: number, cur) => cur.count * Number(cur.key) + soFar,
            0
          ) /
            uniqueWordsTotal) *
            100
        ) / 100;

      return (
        <div className="text-center">
          <h2 className="output-title">Sanat</h2>
          Yhteensä {words.length} sanaa, joista uniikkeja {uniqueWordsTotal}
          <h3 className="output-subtitle">
            Sanat pituuden mukaan ryhmiteltynä
          </h3>
          <p>keskipituus: {meanLength} kirjainta</p>
          <HorizontalBarChart data={lengthData} />
          <h3 className="output-subtitle">
            Sanat esiintymiskertojen mukaan ryhmiteltynä
          </h3>
          <p>sanat esiintyvät keskimäärin {meanCount} kertaa</p>
          <HorizontalBarChart data={countData} />
        </div>
      );
    });
  };

  return (
    <div className="flex-row justify-center gap-16">
      <button type="button" onClick={handleLetterCount}>
        Kirjaimet
      </button>
      <button type="button" onClick={handleCharCount}>
        Merkit
      </button>
      <button type="button" onClick={handleWordCount}>
        Sanat
      </button>
    </div>
  );
};

export default StatTools;
