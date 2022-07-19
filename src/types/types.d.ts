export type TabOptions = 'sort' | 'remove' | 'generate' | 'statistics' | 'play';

export type UnitOptions = 'word' | 'line' | 'sentence';

export type ExtendedUnitOption = UnitOptions | 'char' | 'letter';

export type SetOutputFunction = (
  operator: (input: string) => string | React.ReactNode
) => void;
