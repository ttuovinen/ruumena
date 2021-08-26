import React from 'react';
import { TabOptions } from '../types/types';

interface Props {
  activeTab: TabOptions;
  changeActiveTab: (tab: TabOptions) => void;
}

const ToolTabs: React.FC<Props> = ({ activeTab, changeActiveTab }) => (
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

export default ToolTabs;
