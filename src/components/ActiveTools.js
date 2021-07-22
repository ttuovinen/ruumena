import React from 'react';
import PropTypes from 'prop-types';
import SortTools from './SortTools';
import RemoveTools from './RemoveTools';
import PlayTools from './PlayTools';
import GenerateTools from './GenerateTools';

const getToolComponent = (activeTab) => {
  switch (activeTab) {
    case 'sort':
      return SortTools;
    case 'remove':
      return RemoveTools;
    case 'generate':
      return GenerateTools;
    case 'play':
      return PlayTools;
    default:
      return null;
  }
};

const ActiveTools = ({ activeTab, setOutputWith, unit }) => {
  const Tool = getToolComponent(activeTab);

  return (
    <div className="tools">
      <Tool
        setOutputWith={setOutputWith}
        unit={unit}
        key={activeTab === 'remove' ? unit : null} // reset remove tools on unit change
      />
    </div>
  );
};

ActiveTools.propTypes = {
  activeTab: PropTypes.string.isRequired,
  unit: PropTypes.string.isRequired,
  setOutputWith: PropTypes.func.isRequired,
};

export default ActiveTools;
