import { useEffect, useState } from 'react';
import { getUnitLabel } from '../constants';
import { useTools } from '../contexts/ToolContext';
import { SetOutputFunction, UnitOptions } from '../types/types';
import {
  alphasortItems,
  alphasortItemsConsonant,
  alphasortItemsConsonantlFromEnd,
  alphasortItemsFromEnd,
  alphasortItemsVowel,
  alphasortItemsVowelFromEnd,
  soundClassVariationSortItems,
  countsortItems,
  lengthsortItems,
  shuffleItems,
  softnesssortItems,
  vowelDensitySortItems,
} from '../utils/sorters';
import Toggler from './Toggler';

interface SorterValue {
  label: string;
  sorterFunction: Function;
}
interface Sorter {
  [key: string]: SorterValue;
}

const SORTERS: Sorter = {
  alpha: { label: 'Aakkosta', sorterFunction: alphasortItems },
  alphaEnd: {
    label: 'Aakkosta lopusta',
    sorterFunction: alphasortItemsFromEnd,
  },
  length: {
    label: 'Järjestä pituuden mukaan',
    sorterFunction: lengthsortItems,
  },
  softness: {
    label: 'Järjestä pehmeyden mukaan',
    sorterFunction: softnesssortItems,
  },
  count: {
    label: 'Järjestä esiintymien mukaan',
    sorterFunction: countsortItems,
  },
  random: { label: 'Sekoita', sorterFunction: shuffleItems },
};

const EXTRA_SORTERS: Sorter = {
  alphaVoc: { label: 'Aakkosta vokaalit', sorterFunction: alphasortItemsVowel },
  alphaVocEnd: {
    label: 'Aakkosta vokaalit lopusta',
    sorterFunction: alphasortItemsVowelFromEnd,
  },
  alphaCons: {
    label: 'Aakkosta konsonantit',
    sorterFunction: alphasortItemsConsonant,
  },
  alphaConsEnd: {
    label: 'Aakkosta konsonantit lopusta',
    sorterFunction: alphasortItemsConsonantlFromEnd,
  },
  soundClassVariation: {
    label: 'Järjestä äänneryhmävaihtelun mukaan',
    sorterFunction: soundClassVariationSortItems,
  },
  vowelDensity: {
    label: 'Järjestä vokaalitiheyden mukaan',
    sorterFunction: vowelDensitySortItems,
  },
};

interface Props {
  setOutputWith: SetOutputFunction;
  unit: UnitOptions;
}

const SortTools = ({ setOutputWith, unit }: Props) => {
  const [action, setAction] = useState({ type: '', index: 0 });
  const [reverse, setReverse] = useState(false);
  const { showExtraSorters, setShowExtraSorters } = useTools();
  const [noDuplicates, setNoDuplicates] = useState(false);

  useEffect(() => {
    if (action.type) {
      const sorter =
        SORTERS[action.type]?.sorterFunction ||
        EXTRA_SORTERS[action.type]?.sorterFunction;
      setOutputWith((seed) =>
        sorter({
          seed,
          unit,
          reverse,
          noDuplicates,
        })
      );
    }
    // Omit setOutputWith from dependencies for not to update output while editing input
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [action, noDuplicates, reverse, unit]);

  const renderSorterButton = ([key, { label }]: [
    key: string,
    value: SorterValue
  ]) => (
    <button
      key={key}
      type="button"
      onClick={() => {
        setAction({ type: key, index: action.index + 1 });
      }}
    >
      {label}
    </button>
  );

  return (
    <>
      <div className="flex-row gap-16">
        <div className="flex-row justify-center gap-16">
          {Object.entries(SORTERS).map(renderSorterButton)}
          {showExtraSorters &&
            Object.entries(EXTRA_SORTERS).map(renderSorterButton)}
          <button
            type="button"
            className="no-border"
            onClick={() => setShowExtraSorters(!showExtraSorters)}
          >
            {!showExtraSorters ? '+ Näytä extrat' : '- Piilota extrat'}
          </button>
        </div>
      </div>
      <div className="options-wrapper">
        <Toggler
          name="reverse"
          checked={reverse}
          onChange={() => {
            setReverse(!reverse);
          }}
        >
          käänteinen järjestys
        </Toggler>
        <Toggler
          name="no-duplicates"
          checked={noDuplicates}
          onChange={() => {
            setNoDuplicates(!noDuplicates);
          }}
        >
          kukin {getUnitLabel('nominative', unit)} vain kerran
        </Toggler>
      </div>
    </>
  );
};

export default SortTools;
