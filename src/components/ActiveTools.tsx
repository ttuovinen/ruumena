import React from 'react';
import SortTools from './SortTools';
import RemoveTools from './RemoveTools';
import PlayTools from './PlayTools';
import GenerateTools from './GenerateTools';
import { TabOptions, UnitOptions } from '../types/types';

const getToolComponent = (activeTab: TabOptions) => {
  switch (activeTab) {
    case 'remove':
      return RemoveTools;
    case 'generate':
      return GenerateTools;
    case 'play':
      return PlayTools;
    case 'sort':
    default:
      return SortTools;
  }
};

interface Props {
  activeTab: TabOptions;
  unit: UnitOptions;
  setOutputWith: (operator: (input: string) => string) => void;
}

const ActiveTools: React.FC<Props> = ({ activeTab, unit, setOutputWith }) => {
  const Tool = getToolComponent(activeTab);

  return (
    <div className="tools">
      <Tool
        key={activeTab === 'remove' ? unit : null} // reset remove tools on unit change
        setOutputWith={setOutputWith}
        unit={unit}
      />
    </div>
  );
};

export default ActiveTools;
