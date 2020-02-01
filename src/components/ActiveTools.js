import React from 'react';
import PropTypes from 'prop-types';

const ActiveTools = ({ component: Tool, setOutputWith }) => {
  return (
    <div className="tools">
      <Tool setOutputWith={setOutputWith} />
    </div>
  );
};

ActiveTools.propTypes = {
  component: PropTypes.func.isRequired,
  setOutputWith: PropTypes.func.isRequired,
};

export default ActiveTools;
