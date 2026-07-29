import React from 'react';

const LANG_LABELS = {
  markdown: 'Markdown', javascript: 'JavaScript', python: 'Python',
  css: 'CSS', html: 'HTML', json: 'JSON', text: 'Plain Text',
};

function StatusBar({ tab, cursorPos, charCount, wordCount }) {
  return (
    <div className="status-bar">
      {tab ? (
        <>
          <div className="status-group">
            <span className="status-item">Ln {cursorPos.line}, Col {cursorPos.col}</span>
            <span className="status-item">{charCount} chars</span>
            <span className="status-item">{wordCount} words</span>
          </div>
          <div className="status-group">
            {tab.modified && <span className="status-item modified">Modified</span>}
            {tab.filePath && (
              <span className="status-item" title={tab.filePath}>
                {tab.filePath.split(/[/\\]/).slice(-2, -1).join('') || '\u2022'}
              </span>
            )}
            <span className="status-item lang">{LANG_LABELS[tab.language] || tab.language}</span>
            <span className="status-item encoding">UTF-8</span>
          </div>
        </>
      ) : (
        <div className="status-group">
          <span className="status-item">Ready</span>
        </div>
      )}
    </div>
  );
}

export default StatusBar;
