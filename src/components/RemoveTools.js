import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import {
  removeConstantWords,
  removeRandomWords,
  removeFilteredWords,
} from '../utils/removers';

const RemoveTools = ({ setOutputWith }) => {
  const [removeN, setRemoveN] = useState(3);
  const [removeOffset, setRemoveOffset] = useState(3);
  const [removePercent, setRemovePercent] = useState(33);
  const [filterType, setFilterType] = useState('include');
  const [filterText, setFilterText] = useState('');

  useEffect(() => {
    if (filterText) {
      setOutputWith(seed =>
        removeFilteredWords({
          seed,
          filterText,
          include: filterType === 'include',
        })
      );
    } else {
      setOutputWith(seed => seed);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filterText, filterType]);

  const handleRemoveConstant = () => {
    setOutputWith(seed =>
      removeConstantWords({
        seed,
        removeN,
        removeOffset,
      })
    );
  };

  const handleRemoveRandom = () => {
    setOutputWith(seed =>
      removeRandomWords({
        seed,
        removePercent,
      })
    );
  };

  return (
    <>
      <div className="button-wrapper">
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
          onChange={event => setRemovePercent(event.target.value)}
        />
        {removePercent}% sanoista
      </div>
      <div className="button-wrapper">
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
          onChange={event => {
            setRemoveN(event.target.value);
            setRemoveOffset(event.target.value);
          }}
        />
        {removeN}. sana alkaen
        <input
          type="range"
          name="offset"
          min="1"
          max="20"
          step="1"
          value={removeOffset}
          onChange={event => setRemoveOffset(event.target.value)}
        />
        {removeOffset}.
      </div>
      <div className="button-wrapper">
        {'Poista sanat jotka '}
        <label htmlFor="include">
          <input
            type="radio"
            id="include"
            name="filterinclude"
            value="include"
            checked={filterType === 'include'}
            onChange={event => setFilterType(event.target.value)}
          />
          {' sisältävät '}
        </label>
        <label htmlFor="exclude">
          <input
            type="radio"
            id="exclude"
            name="filterinclude"
            value="exclude"
            checked={filterType === 'exclude'}
            onChange={event => setFilterType(event.target.value)}
          />
          {' eivät sisällä '}
        </label>
        <input
          type="text"
          name="filtertext"
          value={filterText}
          onChange={event => {
            setFilterText(event.target.value);
          }}
        />
      </div>
    </>
  );
};

RemoveTools.propTypes = {
  setOutputWith: PropTypes.func.isRequired,
};

export default RemoveTools;
