import { Unit } from '../types/types';
import { textToItems } from './metaUtils';

describe('Text to words', () =>
  it('splits text to words correctly', () => {
    const text = textToItems(
      'Päivä oli jo niin matalalla kuin ennen muinoin Turussa.',
      Unit.word
    );
    expect(text).toEqual([
      'päivä',
      'oli',
      'jo',
      'niin',
      'matalalla',
      'kuin',
      'ennen',
      'muinoin',
      'turussa',
    ]);
  }));

describe('Text to lines', () =>
  it('splits text to lines correctly', () => {
    const text = textToItems(
      `
      Päivä oli
jo niin matalalla.

 Kuin ennen muinoin Turussa.  
`,
      'line'
    );
    expect(text).toEqual([
      'Päivä oli',
      'jo niin matalalla.',
      'Kuin ennen muinoin Turussa.',
    ]);
  }));

describe('Text to sentences', () =>
  it('splits text to sentences correctly', () => {
    const text = textToItems(
      `Päivä oli... Jo niin matalalla?!
      Kuin ennen muinoin Turussa 1. toukokuuta.
`,
      'sentence'
    );
    expect(text).toEqual([
      'Päivä oli...',
      'Jo niin matalalla?!',
      'Kuin ennen muinoin Turussa 1. toukokuuta.',
    ]);
  }));
