import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { markovMe } from '../utils/markov';

const GenerateTools = ({ setOutputWith }) => {
  const [nSize, setNsize] = useState(5);
  const [outputSize, setOutputSize] = useState(500);
  const [beginning, setBeginning] = useState('');

  const handleGenerate = () => {
    setOutputWith(seed =>
      markovMe(seed, parseInt(nSize, 10), outputSize, beginning)
    );
  };

  return (
    <>
      <div className="button-wrapper">
        Valikoi merkki aina
        <input
          type="range"
          name="nSize"
          min="2"
          max="10"
          step="1"
          value={nSize}
          onChange={event => setNsize(event.target.value)}
        />
        {nSize}:n edellisen perusteella
      </div>
      <div className="button-wrapper">
        Generoi enintään
        <input
          type="range"
          name="outputSize"
          min="100"
          max="5000"
          step="100"
          value={outputSize}
          onChange={event => setOutputSize(event.target.value)}
        />
        {outputSize} merkkiä
      </div>
      <div className="button-wrapper">
        Aloita tällä
        <input
          type="text"
          name="beginning"
          value={beginning}
          onChange={event => {
            setBeginning(event.target.value);
          }}
        />
      </div>
      <div className="button-wrapper">
        <button type="button" onClick={handleGenerate}>
          Luo teksti
        </button>
      </div>
    </>
  );
};

GenerateTools.propTypes = {
  setOutputWith: PropTypes.func.isRequired,
};

export default GenerateTools;
