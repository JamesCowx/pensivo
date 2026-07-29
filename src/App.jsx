import React, { useState, useCallback, useEffect, useRef } from 'react';
import { EditorSelection } from '@codemirror/state';
import TabBar from './components/TabBar';
import EditorPane from './components/EditorPane';
import FormatToolbar from './components/FormatToolbar';
import MarkdownPreview from './components/MarkdownPreview';
import Sidebar from './components/Sidebar';
import StatusBar from './components/StatusBar';

let tabCounter = 0;

const LANGUAGE_MAP = {
  md: 'markdown', js: 'javascript', jsx: 'javascript',
  ts: 'javascript', tsx: 'javascript', py: 'python',
  css: 'css', html: 'html', json: 'json', txt: 'text',
  xml: 'text', yaml: 'text', yml: 'text', log: 'text',
  ini: 'text', cfg: 'text', conf: 'text', env: 'text',
  csv: 'text', gitignore: 'text',
};

function createNewTab(initialContent = '', name = null, filePath = null) {
  tabCounter++;
  const ext = filePath ? filePath.split('.').pop().toLowerCase() : 'md';
  return {
    id: `tab-${Date.now()}-${tabCounter}`,
    name: name || `Untitled-${tabCounter}`,
    content: initialContent,
    language: LANGUAGE_MAP[ext] || 'text',
    filePath,
    modified: false,
    createdAt: Date.now(),
  };
}

function applyFormat(view, cmd) {
  if (!view) return;
  const sel = view.state.selection.main;
  const selected = view.state.sliceDoc(sel.from, sel.to);
  const hasSel = sel.from !== sel.to;

  const formats = {
    bold: hasSel ? `**${selected}**` : '**bold text**',
    italic: hasSel ? `*${selected}*` : '*italic text*',
    strikethrough: hasSel ? `~~${selected}~~` : '~~strikethrough~~',
    code: hasSel ? `\`${selected}\`` : '`code`',
    codeblock: hasSel ? '```\n' + selected + '\n```' : '```\ncode block\n```',
    ulist: hasSel ? selected.split('\n').map(l => `- ${l}`).join('\n') : '- list item',
    olist: hasSel ? selected.split('\n').map((l, i) => `${i + 1}. ${l}`).join('\n') : '1. list item',
    heading: hasSel ? `## ${selected}` : '## Heading',
    link: hasSel ? `[${selected}](url)` : '[link text](url)',
  };

  const replacement = formats[cmd];
  if (!replacement) return;

  view.dispatch({
    changes: { from: sel.from, to: sel.to, insert: replacement },
    selection: EditorSelection.cursor(sel.from + replacement.length),
  });
}

function Titlebar({ isMaximized }) {
  const handleMinimize = () => window.electronAPI?.minimize();
  const handleMaximize = () => window.electronAPI?.maximize();
  const handleClose = () => window.electronAPI?.close();

  return (
    <div className="titlebar">
      <div className="titlebar-drag">
        <svg className="titlebar-logo" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 20h9" />
          <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" />
        </svg>
        <span className="titlebar-title">Pensivo</span>
      </div>
      <div className="titlebar-controls">
        <button className="titlebar-btn" onClick={handleMinimize} aria-label="Minimize">
          <svg width="12" height="12" viewBox="0 0 12 12"><rect y="5" width="12" height="1.5" fill="currentColor" /></svg>
        </button>
        <button className="titlebar-btn" onClick={handleMaximize} aria-label={isMaximized ? 'Restore' : 'Maximize'}>
          {isMaximized ? (
            <svg width="12" height="12" viewBox="0 0 12 12">
              <rect x="2.5" y="0.5" width="9" height="9" rx="1" fill="none" stroke="currentColor" strokeWidth="1.2" />
              <rect x="0.5" y="2.5" width="9" height="9" rx="1" fill="var(--bg-primary)" stroke="currentColor" strokeWidth="1.2" />
            </svg>
          ) : (
            <svg width="12" height="12" viewBox="0 0 12 12">
              <rect x="0.5" y="0.5" width="11" height="11" rx="1.5" fill="none" stroke="currentColor" strokeWidth="1.2" />
            </svg>
          )}
        </button>
        <button className="titlebar-btn titlebar-btn-close" onClick={handleClose} aria-label="Close">
          <svg width="12" height="12" viewBox="0 0 12 12">
            <line x1="1" y1="1" x2="11" y2="11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            <line x1="11" y1="1" x2="1" y2="11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        </button>
      </div>
    </div>
  );
}

function App() {
  const [tabs, setTabs] = useState([]);
  const [activeTabId, setActiveTabId] = useState(null);
  const [showPreview, setShowPreview] = useState(false);
  const [showSidebar, setShowSidebar] = useState(true);
  const [isMaximized, setIsMaximized] = useState(false);
  const [cursorPos, setCursorPos] = useState({ line: 1, col: 1 });
  const editorRef = useRef(null);
  const initialized = useRef(false);
  const autoSaveTimer = useRef(null);

  const activeTab = tabs.find(t => t.id === activeTabId) || null;

  useEffect(() => {
    if (initialized.current) return;
    initialized.current = true;

    (async () => {
      if (window.electronAPI) {
        try {
          const maximized = await window.electronAPI.isMaximized();
          setIsMaximized(maximized);
          const cleanup = window.electronAPI.onMaximized((val) => setIsMaximized(val));
          return cleanup;
        } catch (_) {}
      }
    })();

    (async () => {
      let restored = false;
      if (window.electronAPI) {
        try {
          const session = await window.electronAPI.loadSession();
          if (session?.tabs?.length) {
            tabCounter = session.tabs.length;
            const restoredTabs = session.tabs.map((t, i) => ({
              id: `tab-${Date.now()}-${i}`,
              name: t.name || 'Untitled',
              content: t.content || '',
              language: t.language || 'text',
              filePath: t.filePath || null,
              modified: false,
              createdAt: Date.now() + i,
            }));
            setTabs(restoredTabs);
            const idx = Math.min(Math.max(session.activeTabId || 0, 0), restoredTabs.length - 1);
            setActiveTabId(restoredTabs[idx]?.id);
            restored = true;
          }
        } catch (_) {}
      }
      if (!restored) {
        const tab = createNewTab(
          '# Welcome to Pensivo\n\nA modern hybrid notes app for developers and writers.\n\n## Quick Start\n- **Ctrl+N** New note\n- **Ctrl+O** Open file\n- **Ctrl+S** Save\n- **Ctrl+W** Close tab'
        );
        setTabs([tab]);
        setActiveTabId(tab.id);
      }
    })();
  }, []);

  useEffect(() => {
    if (!window.electronAPI || tabs.length === 0) return;
    if (autoSaveTimer.current) clearTimeout(autoSaveTimer.current);
    autoSaveTimer.current = setTimeout(() => {
      window.electronAPI.saveSession({
        tabs: tabs.map(t => ({
          name: t.name, content: t.content, language: t.language,
          filePath: t.filePath, modified: t.modified,
        })),
        activeTabId: tabs.findIndex(t => t.id === activeTabId),
      });
    }, 2000);
    return () => { if (autoSaveTimer.current) clearTimeout(autoSaveTimer.current); };
  }, [tabs, activeTabId]);

  useEffect(() => {
    if (!window.electronAPI) return;
    const cleanup = window.electronAPI.onMenuAction((action) => {
      switch (action) {
        case 'new': handleNewTab(); break;
        case 'open': handleOpenFile(); break;
        case 'save': handleSaveFile(); break;
        case 'saveAs': handleSaveAs(); break;
        case 'closeTab': if (activeTabId) handleCloseTab(activeTabId); break;
        case 'toggleSidebar': setShowSidebar(p => !p); break;
        case 'togglePreview': if (activeTab?.language === 'markdown') setShowPreview(p => !p); break;
      }
    });
    return cleanup;
  });

  const updateTab = useCallback((id, updates) => {
    setTabs(prev => prev.map(t => (t.id === id ? { ...t, ...updates } : t)));
  }, []);

  const handleContentChange = useCallback((id, content) => {
    updateTab(id, { content, modified: true });
  }, [updateTab]);

  const handleNewTab = useCallback(() => {
    const tab = createNewTab();
    setTabs(prev => [...prev, tab]);
    setActiveTabId(tab.id);
  }, []);

  const handleSelectTab = useCallback((id) => {
    setActiveTabId(id);
    setCursorPos({ line: 1, col: 1 });
  }, []);

  const handleCloseTab = useCallback(async (id) => {
    const tab = tabs.find(t => t.id === id);
    if (!tab) return;
    if (tab.modified && window.electronAPI) {
      const r = await window.electronAPI.confirmClose({ fileName: tab.name });
      if (r === 2) return;
      if (r === 0) {
        const result = await window.electronAPI.saveFile({
          filePath: tab.filePath || null, content: tab.content,
        });
        if (result) updateTab(id, { filePath: result.filePath, name: result.fileName, modified: false });
      }
    }
    setTabs(prev => {
      const idx = prev.findIndex(t => t.id === id);
      const filtered = prev.filter(t => t.id !== id);
      if (filtered.length === 0) {
        const t = createNewTab();
        setActiveTabId(t.id);
        return [t];
      }
      if (id === activeTabId) {
        setActiveTabId(filtered[Math.min(idx, filtered.length - 1)].id);
      }
      return filtered;
    });
  }, [tabs, activeTabId, updateTab]);

  const handleOpenFile = useCallback(async () => {
    if (!window.electronAPI) return;
    try {
      const result = await window.electronAPI.openFile();
      if (!result) return;
      const existing = tabs.find(t => t.filePath === result.filePath);
      if (existing) { setActiveTabId(existing.id); return; }
      const tab = createNewTab(result.content, result.fileName, result.filePath);
      setTabs(prev => [...prev, tab]);
      setActiveTabId(tab.id);
    } catch (_) {}
  }, [tabs]);

  const handleSaveFile = useCallback(async () => {
    if (!activeTab || !window.electronAPI) return;
    try {
      const result = await window.electronAPI.saveFile({
        filePath: activeTab.filePath || null, content: activeTab.content,
      });
      if (!result) return;
      updateTab(activeTab.id, { filePath: result.filePath, name: result.fileName, modified: false });
    } catch (_) {}
  }, [activeTab, updateTab]);

  const handleSaveAs = useCallback(async () => {
    if (!activeTab || !window.electronAPI) return;
    try {
      const result = await window.electronAPI.saveFile({ filePath: null, content: activeTab.content });
      if (!result) return;
      updateTab(activeTab.id, { filePath: result.filePath, name: result.fileName, modified: false });
    } catch (_) {}
  }, [activeTab, updateTab]);

  const handleLanguageChange = useCallback((id, language) => {
    updateTab(id, { language });
  }, [updateTab]);

  const handleFormat = useCallback((cmd) => {
    if (activeTab && editorRef.current?.view) applyFormat(editorRef.current.view, cmd);
  }, [activeTab]);

  const handleTogglePreview = useCallback(() => setShowPreview(p => !p), []);

  const handleCursorActivity = useCallback((pos) => setCursorPos(pos), []);

  useEffect(() => {
    const handleDragOver = (e) => { e.preventDefault(); e.stopPropagation(); };
    const handleDrop = async (e) => {
      e.preventDefault(); e.stopPropagation();
      if (!window.electronAPI) return;
      for (const file of Array.from(e.dataTransfer.files)) {
        try {
          const content = await window.electronAPI.readFile(file.path);
          const tab = createNewTab(content, file.name, file.path);
          setTabs(prev => [...prev, tab]);
          setActiveTabId(tab.id);
        } catch (_) {}
      }
    };
    window.addEventListener('dragover', handleDragOver);
    window.addEventListener('drop', handleDrop);
    return () => {
      window.removeEventListener('dragover', handleDragOver);
      window.removeEventListener('drop', handleDrop);
    };
  }, []);

  useEffect(() => {
    const handleBeforeUnload = (e) => {
      if (tabs.some(t => t.modified)) { e.preventDefault(); e.returnValue = ''; }
    };
    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => window.removeEventListener('beforeunload', handleBeforeUnload);
  }, [tabs]);

  const charCount = activeTab ? activeTab.content.length : 0;
  const wordCount = activeTab
    ? (activeTab.content.trim() ? activeTab.content.trim().split(/\s+/).length : 0)
    : 0;

  return (
    <div className="app">
      <Titlebar isMaximized={isMaximized} />
      <div className="app-body">
        {showSidebar && (
          <Sidebar
            activeTab={activeTab}
            onNewNote={handleNewTab}
            onOpenFile={handleOpenFile}
            onSaveFile={handleSaveFile}
            onLanguageChange={handleLanguageChange}
            tabs={tabs}
          />
        )}
        <div className="main-area">
          <TabBar
            tabs={tabs}
            activeTabId={activeTabId}
            onSelectTab={handleSelectTab}
            onCloseTab={handleCloseTab}
            onNewTab={handleNewTab}
          />
          {activeTab && activeTab.language === 'markdown' && (
            <FormatToolbar
              onFormat={handleFormat}
              onTogglePreview={handleTogglePreview}
              showPreview={showPreview}
            />
          )}
          <div className="editor-container">
            {showPreview && activeTab?.language === 'markdown' ? (
              <MarkdownPreview content={activeTab.content} />
            ) : (
              <EditorPane
                ref={editorRef}
                tab={activeTab}
                onChange={handleContentChange}
                onCursorActivity={handleCursorActivity}
              />
            )}
          </div>
          <StatusBar
            tab={activeTab}
            cursorPos={cursorPos}
            charCount={charCount}
            wordCount={wordCount}
          />
        </div>
      </div>
    </div>
  );
}

export default App;
