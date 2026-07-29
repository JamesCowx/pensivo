import React, { useCallback } from 'react';
import CodeMirror from '@uiw/react-codemirror';
import { EditorView } from '@codemirror/view';
import { javascript } from '@codemirror/lang-javascript';
import { markdown } from '@codemirror/lang-markdown';
import { python } from '@codemirror/lang-python';
import { css } from '@codemirror/lang-css';
import { html } from '@codemirror/lang-html';
import { json } from '@codemirror/lang-json';
import { oneDark } from '@codemirror/theme-one-dark';

const extensions = {
  javascript: () => javascript(),
  markdown: () => markdown(),
  python: () => python(),
  css: () => css(),
  html: () => html(),
  json: () => json(),
  text: () => [],
};

const EmptyState = () => (
  <div className="editor-empty">
    <div className="empty-state">
      <svg className="empty-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 20h9" /><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" />
      </svg>
      <h2>Notes</h2>
      <p>Create a new note or open an existing file.</p>
      <div className="shortcut-hints">
        <span>Ctrl+N New</span>
        <span>Ctrl+O Open</span>
        <span>Ctrl+S Save</span>
      </div>
    </div>
  </div>
);

const EditorPane = React.forwardRef(({ tab, onChange, onCursorActivity }, ref) => {
  const cursorListener = useCallback(() => {
    if (!onCursorActivity) return;
    return EditorView.updateListener.of((update) => {
      if (update.selectionSet || update.docChanged) {
        const pos = update.state.selection.main.head;
        const line = update.state.doc.lineAt(pos);
        onCursorActivity({ line: line.number, col: pos - line.from + 1 });
      }
    });
  }, [onCursorActivity]);

  if (!tab) return <EmptyState />;

  const langExt = extensions[tab.language] || extensions.text;
  const extList = [langExt(), cursorListener()].filter(Boolean);

  return (
    <div className="editor-pane">
      <CodeMirror
        ref={ref}
        value={tab.content}
        height="100%"
        theme={tab.darkMode ? oneDark : undefined}
        extensions={extList}
        onChange={(value) => onChange(tab.id, value)}
        basicSetup={{
          lineNumbers: tab.language !== 'markdown',
          foldGutter: tab.language !== 'markdown',
          highlightActiveLine: true,
          autocompletion: true,
          bracketMatching: true,
          closeBrackets: true,
          indentOnInput: true,
          tabSize: 2,
        }}
        placeholder="Start typing..."
      />
    </div>
  );
});

export default EditorPane;
