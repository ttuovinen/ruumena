import React from 'react';
import PropTypes from 'prop-types';

const ToolTabs = ({ activeTab, changeActiveTab }) => (
  <>
    <button
      type="button"
      className={activeTab === 'sort' ? 'tab tab__active' : 'tab'}
      onClick={() => changeActiveTab('sort')}
    >
      Järjestä
    </button>
    <button
      type="button"
      className={activeTab === 'remove' ? 'tab tab__active' : 'tab'}
      onClick={() => changeActiveTab('remove')}
    >
      Poista
    </button>
    <button
      type="button"
      className={activeTab === 'generate' ? 'tab tab__active' : 'tab'}
      onClick={() => changeActiveTab('generate')}
    >
      Generoi
    </button>
    <button
      type="button"
      className={
        activeTab === 'play' ? 'tab tab__right tab__active' : 'tab tab__right'
      }
      onClick={() => changeActiveTab('play')}
    >
      Leiki
    </button>
  </>
);

ToolTabs.propTypes = {
  activeTab: PropTypes.string.isRequired,
  changeActiveTab: PropTypes.func.isRequired,
};

export default ToolTabs;
