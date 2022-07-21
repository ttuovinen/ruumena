import { CountData } from '../utils/statistics';
import { mapToScale } from '../utils/metaUtils';

const CHART_SIZE = 400;

interface Props {
  data: CountData;
}

const HorizontalBarChart = ({ data }: Props) => {
  const maxValue = Math.max(...data.map((item) => item.count));

  const getSize = (value: number) =>
    Math.ceil(
      mapToScale(
        value,
        0,
        maxValue,
        0,
        Math.min(CHART_SIZE, window.innerWidth * 0.4)
      )
    );

  return (
    <div>
      <div className="barchart barchart--horizontal">
        {data.map(({ key, count, percent, items }) => (
          <div key={key} className="flex-row">
            <div
              className="barchart__key uppercase"
              data-tooltip={items?.join(', ')}
            >
              {key}
            </div>
            <div className="barchart__bar" style={{ width: getSize(count) }} />
            <div className="barchart__value">
              {count} ({percent}%)
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HorizontalBarChart;
