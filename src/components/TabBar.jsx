import React from 'react';

function TabBar({ tabs, activeTabId, onSelectTab, onCloseTab, onNewTab }) {
  return (
    <div className="tab-bar">
      <div className="tab-list">
        {tabs.map((tab) => (
          <div
            key={tab.id}
            className={`tab ${tab.id === activeTabId ? 'active' : ''}`}
            onClick={() => onSelectTab(tab.id)}
          >
            <span className="tab-name">{tab.name}</span>
            {tab.modified && <span className="tab-modified">&bull;</span>}
            <button
              className="tab-close"
              onClick={(e) => { e.stopPropagation(); onCloseTab(tab.id); }}
            >
              &times;
            </button>
          </div>
        ))}
      </div>
      <button className="new-tab-btn" onClick={onNewTab} title="New Note">+</button>
    </div>
  );
}

export default TabBar;
