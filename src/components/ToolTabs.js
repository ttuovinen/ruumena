import React from 'react';
import PropTypes from 'prop-types';

const ToolTabs = ({ activeTab, setActiveTab }) => (
  <>
    <button
      type="button"
      className={activeTab === 'sort' ? 'tab tab__active' : 'tab'}
      onClick={() => setActiveTab('sort')}
    >
      Järjestä sanat
    </button>
    <button
      type="button"
      className={activeTab === 'remove' ? 'tab tab__active' : 'tab'}
      onClick={() => setActiveTab('remove')}
    >
      Poista sanoja
    </button>
    <button
      type="button"
      className={
        activeTab === 'play' ? 'tab tab__right tab__active' : 'tab tab__right'
      }
      onClick={() => setActiveTab('play')}
    >
      Leiki
    </button>
  </>
);

ToolTabs.propTypes = {
  activeTab: PropTypes.string.isRequired,
  setActiveTab: PropTypes.func.isRequired,
};

export default ToolTabs;
