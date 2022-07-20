import { useEffect, useState } from 'react';
import {
  lengthsortItems,
  alphasortItems,
  alphasortItemsFromEnd,
  countsortItems,
  shuffleItems,
  softnesssortItems,
} from '../utils/sorters';
import { getUnitLabel } from '../constants';
import { SetOutputFunction, UnitOptions } from '../types/types';
import Toggler from './Toggler';

const SORTERS: {
  [key: string]: { label: string; sorterFunction: Function };
} = {
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

interface Props {
  setOutputWith: SetOutputFunction;
  unit: UnitOptions;
}

const SortTools = ({ setOutputWith, unit }: Props) => {
  const [action, setAction] = useState({ type: '', index: 0 });
  const [reverse, setReverse] = useState(false);
  const [noDuplicates, setNoDuplicates] = useState(false);

  useEffect(() => {
    if (action.type) {
      const sorter = SORTERS[action.type]!.sorterFunction;
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

  return (
    <>
      <div className="flex-row justify-center gap-16">
        {Object.entries(SORTERS).map(([key, { label }]) => (
          <button
            key={key}
            type="button"
            onClick={() => {
              setAction({ type: key, index: action.index + 1 });
            }}
          >
            {label}
          </button>
        ))}
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
