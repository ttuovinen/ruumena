import { useState } from 'react';
import { SetOutputFunction } from '../types/types';
import { markovMe } from '../utils/markov';

interface Props {
  setOutputWith: SetOutputFunction;
}

const GenerateTools = ({ setOutputWith }: Props) => {
  const [nSize, setNsize] = useState(5);
  const [outputSize, setOutputSize] = useState(500);
  const [beginning, setBeginning] = useState('');

  const handleGenerate = () => {
    setOutputWith((seed) => markovMe(seed, nSize, outputSize, beginning));
  };

  return (
    <div className="flex-column">
      <div className="flex-row justify-center">
        Valikoi merkki aina
        <input
          type="range"
          name="nSize"
          min="2"
          max="10"
          step="1"
          value={nSize}
          onChange={(event) => setNsize(+event.target.value)}
        />
        {nSize}:n edellisen perusteella
      </div>
      <div className="flex-row justify-center">
        Generoi enintään
        <input
          type="range"
          name="outputSize"
          min="100"
          max="5000"
          step="100"
          value={outputSize}
          onChange={(event) => setOutputSize(+event.target.value)}
        />
        {outputSize} merkkiä
      </div>
      <div className="flex-row justify-center">
        Aloita tällä
        <input
          type="text"
          name="beginning"
          value={beginning}
          onChange={(event) => {
            setBeginning(event.target.value);
          }}
        />
      </div>
      <div className="flex-row justify-center">
        <button type="button" onClick={handleGenerate}>
          Luo teksti
        </button>
      </div>
    </div>
  );
};

export default GenerateTools;
