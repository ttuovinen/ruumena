import { useState, useEffect } from 'react';
import {
  removeConstantItems,
  removeRandomItems,
  removeFilteredItems,
} from '../utils/removers';
import { getUnitLabel } from '../constants';
import { FilterType, SetOutputFunction, Unit } from '../types/types';
import Toggler from './Toggler';

const FILTER_TYPES = [
  { key: FilterType.includes, label: 'sisältävät' },
  { key: FilterType.excludes, label: 'eivät sisällä' },
  { key: FilterType.startsWith, label: 'alkavat' },
  { key: FilterType.notStartsWith, label: 'eivät ala' },
  { key: FilterType.endsWith, label: 'päättyvät' },
  { key: FilterType.notEndsWith, label: 'eivät pääty' },
];

interface Props {
  setOutputWith: SetOutputFunction;
  unit: Unit;
}

const RemoveTools = ({ setOutputWith, unit }: Props) => {
  const [removeN, setRemoveN] = useState(3);
  const [removeOffset, setRemoveOffset] = useState(3);
  const [removePercent, setRemovePercent] = useState(33);
  const [replace, setReplace] = useState(true);
  const [filterType, setFilterType] = useState(FilterType.includes);
  const [filterText, setFilterText] = useState('');

  useEffect(() => {
    if (filterText) {
      setOutputWith((seed) =>
        removeFilteredItems({
          seed,
          unit,
          filterType,
          filterText,
          replaceWith: replace ? '_' : '',
        })
      );
    } else {
      setOutputWith((seed) => seed);
    }
  }, [filterText, filterType, replace, setOutputWith, unit]);

  const handleRemoveConstant = () => {
    setOutputWith((seed) =>
      removeConstantItems({
        seed,
        unit,
        removeN,
        removeOffset,
        replaceWith: replace ? '_' : '',
      })
    );
  };

  const handleRemoveRandom = () => {
    setOutputWith((seed) =>
      removeRandomItems({
        seed,
        unit,
        removePercent,
        replaceWith: replace ? '_' : '',
      })
    );
  };

  return (
    <>
      <div className="flex-column">
        <div className="flex-row justify-center">
          <button type="button" onClick={handleRemoveRandom}>
            Poista satunnaisesti
          </button>
          <input
            type="range"
            name="percent"
            min="1"
            max="99"
            step="1"
            value={removePercent}
            onChange={(event) => setRemovePercent(Number(event.target.value))}
          />
          {removePercent}% {getUnitLabel('pluralElative', unit)}
        </div>
        <div className="flex-row justify-center">
          <button type="button" onClick={handleRemoveConstant}>
            Poista säännöllisesti
          </button>
          {' joka'}
          <input
            type="range"
            name="step"
            min="2"
            max="20"
            step="1"
            value={removeN}
            onChange={(event) => {
              setRemoveN(Number(event.target.value));
              setRemoveOffset(Number(event.target.value));
            }}
          />
          {removeN}. {getUnitLabel('nominative', unit)} alkaen
          <input
            type="range"
            name="offset"
            min="1"
            max="20"
            step="1"
            value={removeOffset}
            onChange={(event) => setRemoveOffset(Number(event.target.value))}
          />
          {removeOffset}.
        </div>
        <div className="flex-row justify-center">
          {`Poista ${getUnitLabel('pluralNominative', unit)}, jotka `}
          <select
            value={filterType}
            onChange={(event) =>
              setFilterType(event.target.value as FilterType)
            }
            aria-label="valitse poistamisehto"
          >
            {FILTER_TYPES.map(({ key, label }) => (
              <option key={key} value={key}>
                {label}
              </option>
            ))}
          </select>
          <input
            type="text"
            name="filtertext"
            value={filterText}
            onChange={(event) => {
              setFilterText(event.target.value);
            }}
            aria-label="kirjoita ehdolle merkkijono"
          />
        </div>
      </div>
      <div className="options-wrapper">
        <Toggler
          name="remove-type"
          checked={replace}
          onChange={() => setReplace(!replace)}
        >
          korvaa poistetut {getUnitLabel('pluralNominative', unit)} viivoilla
        </Toggler>
      </div>
    </>
  );
};

export default RemoveTools;
