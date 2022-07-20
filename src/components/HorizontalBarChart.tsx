import React from 'react';
import PropTypes from 'prop-types';
import { CountData } from '../utils/statistics';
// import { mapToScale } from '../utils/metaUtils';

// MOVE to metaUtils:
/* general math helpers */
export const mapToScale = (
  num: number,
  inMin: number,
  inMax: number,
  outMin: number,
  outMax: number
) => ((num - inMin) * (outMax - outMin)) / (inMax - inMin) + outMin;

const CHART_SIZE = 400;

interface Props {
  data: CountData;
}

const HorizontalBarChart = ({ data }: Props) => {
  console.log({ data });
  const buckets: Record<number, number> = {};
  data.forEach(({ count }) => {
    buckets[count] = (buckets[count] || 0) + 1;
  });
  // const maxValue = Math.max(...Object.values(buckets));
  const maxValue = Math.max(...data.map((item) => item.count));

  const getSize = (value: number) =>
    Math.ceil(mapToScale(value, 0, maxValue, 0, CHART_SIZE));

  // const barData = Object.entries(buckets)
  //   .sort((a, b) => Number(a[0]) - Number(b[0]))
  //   .map(([key, value]) => ({
  //     key,
  //     value,
  //     label: `${value} sanaa`,
  //     size: getSize(value),
  //   }));
  const barData = data;
  return (
    <div>
      <div className="barchart barchart--horizontal">
        {barData.map(({ key, count, percent }) => (
          <div className="flex-row">
            <div className="uppercase">{key}</div>
            <div className="barchart__bar" style={{ width: getSize(count) }} />
            <div>
              {count} ({percent}%)
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

HorizontalBarChart.propTypes = {
  data: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
};

export default HorizontalBarChart;
