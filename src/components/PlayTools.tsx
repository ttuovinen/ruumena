import React from 'react';
// @ts-ignore
import sananmuunnos from 'sananmuunnos';
import { emoticonize } from '../utils/emoticons';

interface Props {
  setOutputWith: (operator: (input: string) => string) => void;
}

const PlayTools: React.FC<Props> = ({ setOutputWith }) => {
  const handleKontti = () => {
    setOutputWith((seed) =>
      seed
        .replace(/\s+/g, ' ')
        .toLowerCase()
        .trim()
        .split(' ')
        .map((s) => sananmuunnos(`${s} kontti`))
        .join(' ')
    );
  };

  const handleDuha = () => {
    setOutputWith((seed) => seed.replace(/N/g, 'D').replace(/n/g, 'd'));
  };

  const handleEmoticonize = () => {
    setOutputWith((seed) => emoticonize(seed));
  };

  const uniVowelize = (vowel: string) => {
    setOutputWith((seed) =>
      seed
        .replace(/[aeiouyåäö]/g, vowel.toLowerCase())
        .replace(/[AEIOUYÅÄÖ]/g, vowel.toUpperCase())
    );
  };

  return (
    <>
      <div className="button-wrapper">
        <button type="button" onClick={handleKontti}>
          kontinkieli
        </button>
        <button type="button" onClick={handleDuha}>
          duhainen
        </button>
        <button type="button" onClick={handleEmoticonize}>
          {'=)'}
        </button>
      </div>
      <div className="button-wrapper">
        {'aeiouyäö'.split('').map((vowel) => (
          <button type="button" key={vowel} onClick={() => uniVowelize(vowel)}>
            {vowel}
          </button>
        ))}
      </div>
    </>
  );
};

export default PlayTools;
