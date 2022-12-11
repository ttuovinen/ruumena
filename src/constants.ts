import { Unit, UnitVocabulary, UnitVocabularyVariant } from './types/types';

export const NO_INPUT = 'ei lähdetekstiä';

export const UNITS: UnitVocabulary[] = [
  {
    key: Unit.word,
    nominative: 'sana',
    pluralNominative: 'sanat',
    pluralElative: 'sanoista',
    pluralIllative: 'sanoihin',
  },
  {
    key: Unit.line,
    nominative: 'säe',
    pluralNominative: 'säkeet',
    pluralElative: 'säkeistä',
    pluralIllative: 'säkeisiin',
  },
  {
    key: Unit.sentence,
    nominative: 'lause',
    pluralNominative: 'lauseet',
    pluralElative: 'lauseista',
    pluralIllative: 'lauseisiin',
  },
];

export const getUnitLabel = (variant: UnitVocabularyVariant, unit: Unit) =>
  UNITS.find((item) => item.key === unit)?.[variant] ?? '???';
