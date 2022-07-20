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

const CHART_HEIGHT = 200;

interface Props {
  data: CountData;
}

const Charts = ({ data }: Props) => {
  console.log({ data });
  const buckets: Record<number, number> = {};
  data.forEach(({ count }) => {
    buckets[count] = (buckets[count] || 0) + 1;
  });
  const maxKey = Math.max(...Object.keys(buckets).map(Number));
  const maxValue = Math.max(...Object.values(buckets));

  const getHeight = (value: number) =>
    Math.ceil(mapToScale(value, 0, maxValue, 0, CHART_HEIGHT));

  const barData = Object.entries(buckets)
    .sort((a, b) => Number(a[0]) - Number(b[0]))
    .map(([key, value]) => ({
      key,
      value,
      label: `${value} sanaa`,
      height: getHeight(value),
    }));
  return (
    <div>
      <h3>ne joissa näin monta</h3>
      {Object.entries(buckets)
        .sort((a, b) => Number(a[0]) - Number(b[0]))
        .map(([key, value]) => (
          <div>
            {key}: {value} juttua
          </div>
        ))}
      <p>maksi oli {maxValue}</p>
      <p>maksikey oli {maxKey}</p>
      <div className="barchart barchart--vertical">
        {barData.map(({ key, value, height }) => (
          <div key={key} style={{ textAlign: 'center' }}>
            <div>{value}</div>
            <div className="barchart__bar" style={{ height }} />
            <div>{key}.</div>
          </div>
        ))}
      </div>
      <div>kertaa</div>
    </div>
  );
};

Charts.propTypes = {
  data: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
};

export default Charts;
