export const NO_INPUT = 'ei lähdetekstiä';

export const UNITS = [
  {
    key: 'word',
    nominative: 'sana',
    pluralNominative: 'sanat',
    pluralElative: 'sanoista',
    pluralIllative: 'sanoihin',
  },
  {
    key: 'line',
    nominative: 'säe',
    pluralNominative: 'säkeet',
    pluralElative: 'säkeistä',
    pluralIllative: 'säkeisiin',
  },
  {
    key: 'sentence',
    nominative: 'lause',
    pluralNominative: 'lauseet',
    pluralElative: 'lauseista',
    pluralIllative: 'lauseisiin',
  },
];

export const getUnitLabel = (variant, unit) => {
  return UNITS.find((item) => item.key === unit)?.[variant] || '???';
};
