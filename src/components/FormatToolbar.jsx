import React from 'react';

function FormatToolbar({ onFormat, onTogglePreview, showPreview }) {
  const groups = [
    [
      { label: 'B', cmd: 'bold', title: 'Bold' },
      { label: 'I', cmd: 'italic', title: 'Italic' },
      { label: 'S', cmd: 'strikethrough', title: 'Strikethrough' },
    ],
    [
      { label: '`', cmd: 'code', title: 'Inline Code' },
      { label: '</>', cmd: 'codeblock', title: 'Code Block' },
    ],
    [
      { label: 'ul', cmd: 'ulist', title: 'Bullet List' },
      { label: 'ol', cmd: 'olist', title: 'Numbered List' },
    ],
    [
      { label: 'H', cmd: 'heading', title: 'Heading' },
      { label: '\u2197', cmd: 'link', title: 'Link' },
    ],
  ];

  return (
    <div className="format-toolbar">
      {groups.map((group, gi) => (
        <div key={gi} className="format-group">
          {group.map((f) => (
            <button
              key={f.cmd}
              className="format-btn"
              title={f.title}
              onClick={() => onFormat(f.cmd)}
            >
              {f.label}
            </button>
          ))}
        </div>
      ))}
      <div className="format-group" style={{ marginLeft: 'auto' }}>
        <button
          className={`format-btn ${showPreview ? 'active' : ''}`}
          onClick={onTogglePreview}
          title="Toggle Preview"
        >
          Preview
        </button>
      </div>
    </div>
  );
}

export default FormatToolbar;
