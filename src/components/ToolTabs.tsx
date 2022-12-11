import React from 'react';
import { TabOptions } from '../types/types';

interface Props {
  activeTab: TabOptions;
  changeActiveTab: (newTab: TabOptions) => void;
}

const ToolTabs: React.FC<Props> = ({ activeTab, changeActiveTab }) => (
  <>
    <button
      type="button"
      className={activeTab === TabOptions.sort ? 'tab tab__active' : 'tab'}
      onClick={() => changeActiveTab(TabOptions.sort)}
    >
      Järjestä
    </button>
    <button
      type="button"
      className={activeTab === TabOptions.remove ? 'tab tab__active' : 'tab'}
      onClick={() => changeActiveTab(TabOptions.remove)}
    >
      Poista
    </button>
    <button
      type="button"
      className={activeTab === TabOptions.generate ? 'tab tab__active' : 'tab'}
      onClick={() => changeActiveTab(TabOptions.generate)}
    >
      Generoi
    </button>
    <button
      type="button"
      className={
        activeTab === TabOptions.statistics ? 'tab tab__active' : 'tab'
      }
      onClick={() => changeActiveTab(TabOptions.statistics)}
    >
      Tilastoi
    </button>
    <button
      type="button"
      className={
        activeTab === 'play' ? 'tab tab__right tab__active' : 'tab tab__right'
      }
      onClick={() => changeActiveTab(TabOptions.play)}
    >
      Leiki
    </button>
  </>
);

export default ToolTabs;
