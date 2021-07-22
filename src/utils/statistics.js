import { by, textToItems } from './metaUtils';

// Count amount of each item in text and return them as
// [{ item: 'a', count: 523, percent 16,23 }, {...}...]
export const countItems = (seed, unit) => {
  const buckets = {};
  const items = textToItems(seed, unit);
  items.forEach((item) => {
    buckets[item] = (buckets[item] || 0) + 1;
  });
  const total = items.length;
  return Object.entries(buckets)
    .map(([key, count]) => ({
      key,
      count,
      percent: Math.round((count / total) * 10000) / 100,
    }))
    .reverse()
    .sort(by('count'))
    .reverse();
};
