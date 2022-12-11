export enum TabOptions {
  sort = 'sort',
  remove = 'remove',
  generate = 'generate',
  statistics = 'statistics',
  play = 'play',
}
export enum Unit {
  word = 'word',
  line = 'line',
  sentence = 'sentence',
}

export enum ExtraUnit {
  char = 'char',
  letter = 'letter',
}

export type ExtendedUnit = Unit | ExtraUnit;

export type UnitVocabularyVariant =
  | 'nominative'
  | 'pluralNominative'
  | 'pluralElative'
  | 'pluralIllative';

export interface UnitVocabulary {
  key: Unit;
  nominative: string;
  pluralNominative: string;
  pluralElative: string;
  pluralIllative: string;
}

export type SetOutputFunction = (
  operator: (input: string) => string | React.ReactNode
) => void;
