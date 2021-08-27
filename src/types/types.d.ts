// export enum Tabs {
//   sort = 'sort',
//   remove = 'remove',
//   generate = 'generate',
//   play = 'play',
// }

export type TabOptions = 'sort' | 'remove' | 'generate' | 'play';

export type UnitOptions = 'word' | 'line' | 'sentence';

export type SetOutputFunction = (operator: (input: string) => string) => void;
