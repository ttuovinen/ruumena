import SortTools from './SortTools';
import RemoveTools from './RemoveTools';
import PlayTools from './PlayTools';
import GenerateTools from './GenerateTools';
import { SetOutputFunction, TabOptions, Unit } from '../types/types';
import StatTools from './StatTools';

const getToolComponent = (activeTab: TabOptions) => {
  switch (activeTab) {
    case TabOptions.remove:
      return RemoveTools;
    case TabOptions.generate:
      return GenerateTools;
    case TabOptions.statistics:
      return StatTools;
    case TabOptions.play:
      return PlayTools;
    case TabOptions.sort:
    default:
      return SortTools;
  }
};

interface Props {
  activeTab: TabOptions;
  unit: Unit;
  setOutputWith: SetOutputFunction;
}

const ActiveTools = ({ activeTab, unit, setOutputWith }: Props) => {
  const Tool = getToolComponent(activeTab);

  return (
    <div className="tools">
      <Tool
        key={unit} // reset tools on unit change
        setOutputWith={setOutputWith}
        unit={unit}
      />
    </div>
  );
};

export default ActiveTools;
