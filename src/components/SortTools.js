import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import {
  lengthsortItems,
  alphasortItems,
  alphasortItemsFromEnd,
  countsortItems,
  shuffleItems,
  softnesssortItems,
} from '../utils/sorters';
import { getUnitLabel } from '../constants';

const SORTERS = {
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

const SortTools = ({ setOutputWith, unit }) => {
  const [action, setAction] = useState({ type: null, index: 0 });
  const [reverse, setReverse] = useState(false);
  const [noDuplicates, setNoDuplicates] = useState(false);

  useEffect(() => {
    if (action.type) {
      const sorter = SORTERS[action.type].sorterFunction;
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
      <div className="button-wrapper">
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
        <label className="checkbox-label" htmlFor="reverse">
          <input
            type="checkbox"
            id="reverse"
            checked={reverse}
            onChange={() => {
              setReverse(!reverse);
            }}
          />
          käänteinen järjestys
        </label>
        <label className="checkbox-label" htmlFor="no-duplicates">
          <input
            type="checkbox"
            id="no-duplicates"
            checked={noDuplicates}
            onChange={() => {
              setNoDuplicates(!noDuplicates);
            }}
          />
          kukin {getUnitLabel('nominative', unit)} vain kerran
        </label>
      </div>
    </>
  );
};

SortTools.propTypes = {
  setOutputWith: PropTypes.func.isRequired,
  unit: PropTypes.string.isRequired,
};

export default SortTools;
