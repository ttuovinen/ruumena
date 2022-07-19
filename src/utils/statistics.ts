import { ExtendedUnitOption } from '../types/types';
import { by, textToItems } from './metaUtils';

export interface CountDataItem {
  key: string;
  count: number;
  percent: number;
}

export type CountData = CountDataItem[];

export const percentFrom = (value: number, total: number): number =>
  Math.round((value / total) * 10000) / 100;

// Count amount of each item in text and return them as
// [{ item: 'a', count: 523, percent 16,23 }, {...}...]
export const countItems = (
  seed: string,
  unit: ExtendedUnitOption
): CountData => {
  const buckets: Record<string, number> = {};
  const items = textToItems(seed, unit);
  items.forEach((item: string) => {
    buckets[item] = (buckets[item] || 0) + 1;
  });
  const total = items.length;
  return Object.entries(buckets)
    .map(([key, count]) => ({
      key,
      count,
      percent: percentFrom(count, total),
    }))
    .reverse()
    .sort(by('count'))
    .reverse();
};
