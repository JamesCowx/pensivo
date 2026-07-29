<div align="center">
  <br>
  <svg width="72" height="72" viewBox="0 0 24 24" fill="none" stroke="url(#g)" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
    <defs><linearGradient id="g" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stop-color="#6c8cff"/><stop offset="100%" stop-color="#a277ff"/></linearGradient></defs>
    <path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/>
  </svg>
  <h1>Pensivo</h1>
  <p><em>Italian for "thoughtful, pensive."</em></p>
  <p>
    A premium, dark-first notes app that blends the simplicity of a sticky note<br>
    with the power of a modern code editor.
  </p>
  <p>
    <a href="https://github.com/JamesCowx/pensivo/releases/latest"><img src="https://img.shields.io/github/v/release/JamesCowx/pensivo?color=6c8cff&style=for-the-badge" alt="Latest Release"></a>
    <a href="https://github.com/JamesCowx/pensivo/blob/master/LICENSE"><img src="https://img.shields.io/github/license/JamesCowx/pensivo?color=a277ff&style=for-the-badge" alt="License"></a>
    <a href="https://github.com/JamesCowx/pensivo/stargazers"><img src="https://img.shields.io/github/stars/JamesCowx/pensivo?color=ffca4d&style=for-the-badge" alt="Stars"></a>
  </p>
  <br>
</div>

---

## Why Pensivo?

Most notes apps feel either too simple or too heavy. **Pensivo** hits the sweet spot — it opens instantly, gives you tabs and syntax highlighting when you need them, and stays out of your way when you just want to write. Dark mode isn't an afterthought; it's the default.

- **For developers** — edit notes in Markdown, preview rendered output, get syntax highlighting for 10+ languages, and drop code files directly into tabs.
- **For writers** — distraction-free writing space, rich formatting toolbar, live preview, session restore.

---

## Features

<table>
  <tr>
    <td width="50%">
      <h4>📑 Tabbed Editing</h4>
      <p>Open multiple notes side-by-side. Switch, reorder, and close tabs like a pro code editor.</p>
    </td>
    <td width="50%">
      <h4>🎨 Syntax Highlighting</h4>
      <p>JavaScript, TypeScript, Python, HTML, CSS, JSON, Markdown, YAML, and more — detected from file extension.</p>
    </td>
  </tr>
  <tr>
    <td>
      <h4>👁️ Live Markdown Preview</h4>
      <p>Toggle between editing and a rendered preview. Write documentation, notes, or articles with instant feedback.</p>
    </td>
    <td>
      <h4>📝 Formatting Toolbar</h4>
      <p>Bold, italic, headings, lists, code blocks, and links — insert proper Markdown with one click.</p>
    </td>
  </tr>
  <tr>
    <td>
      <h4>🌙 Dark by Default</h4>
      <p>A carefully crafted dark theme optimized for long sessions. No light-mode eye strain here.</p>
    </td>
    <td>
      <h4>💾 Session Persistence</h4>
      <p>All tabs and content auto-save every 2 seconds. Close the app — everything is exactly where you left it.</p>
    </td>
  </tr>
  <tr>
    <td>
      <h4>📂 File Management</h4>
      <p>Open files via dialog or drag-and-drop from Explorer. Save with <kbd>Ctrl+S</kbd>, Save As with <kbd>Ctrl+Shift+S</kbd>.</p>
    </td>
    <td>
      <h4>🪟 Frameless Window</h4>
      <p>Custom titlebar with native-feel minimize, maximize, and close controls. Clean and modern.</p>
    </td>
  </tr>
  <tr>
    <td>
      <h4>📊 Status Bar</h4>
      <p>Line and column position, character count, word count, language mode, and modification state.</p>
    </td>
    <td>
      <h4>⌨️ Keyboard Driven</h4>
      <p>Every action has a shortcut. <kbd>Ctrl+N</kbd> new, <kbd>Ctrl+O</kbd> open, <kbd>Ctrl+W</kbd> close, <kbd>Ctrl+B</kbd> toggle sidebar.</p>
    </td>
  </tr>
</table>

---

## Quick Start

```bash
# Download the latest release
# → https://github.com/JamesCowx/pensivo/releases/latest
#
# Windows:  Pensivo-Setup-1.0.0.exe   (installer)
#           Pensivo-Portable-1.0.0.exe (no install required)
# macOS:    Pensivo-1.0.0.dmg
# Linux:    Pensivo-1.0.0.AppImage
```

Or build from source:

```bash
git clone https://github.com/JamesCowx/pensivo.git
cd pensivo
npm install
npm run dev        # development mode with hot reload
npm run build      # production build → release/
```

---

## Tech Stack

| Layer | Technology | Purpose |
|---|---|---|
| **Desktop** | [Electron](https://electronjs.org) | Cross-platform shell, native menus, IPC |
| **UI** | [React 19](https://react.dev) | Component architecture, state management |
| **Editor** | [CodeMirror 6](https://codemirror.net) | Syntax highlighting, document model, keybindings |
| **Markdown** | [marked](https://marked.js.org) | Live preview rendering |
| **Bundler** | [Vite 8](https://vitejs.dev) | Dev server (HMR) + production builds |
| **Packaging** | [electron-builder](https://electron.build) | NSIS installer, portable EXE, DMG, AppImage |
| **Theme** | Custom CSS + One Dark | 140+ CSS custom properties, dark-first design system |
| **Fonts** | Inter + JetBrains Mono | UI text + monospace code |

---

## Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                      Electron Main Process                   │
│  ┌─────────────┐  ┌─────────────┐  ┌──────────────────────┐ │
│  │  App Menu    │  │  IPC Layer   │  │  Session Persistence │ │
│  │  File · Edit  │◄─┤  (preload)   │──┤  window-state.json   │ │
│  │  View · Help  │  │              │  │  session.json         │ │
│  └─────────────┘  └──────┬──────┘  └──────────────────────┘ │
│                           │                                   │
├───────────────────────────┴───────────────────────────────────┤
│                      Renderer (React)                         │
│  ┌───────────┐  ┌────────────┐  ┌──────────────────────────┐ │
│  │  Sidebar   │  │   TabBar    │  │  FormatToolbar            │ │
│  │  navigation│  │   tab list  │  │  markdown helpers          │ │
│  └─────┬─────┘  └─────┬──────┘  └───────────┬──────────────┘ │
│        │              │                      │                │
│  ┌─────┴──────────────┴──────────────────────┴──────────────┐ │
│  │                     EditorPane                            │ │
│  │              CodeMirror 6 + Syntax Highlight              │ │
│  └──────────────────────────┬───────────────────────────────┘ │
│                             │                                  │
│  ┌─────────────────────────┴────────────────────────────────┐ │
│  │              MarkdownPreview (toggle)                      │ │
│  │         marked → sanitized HTML → rendered view            │ │
│  └──────────────────────────────────────────────────────────┘ │
│  ┌──────────────────────────────────────────────────────────┐ │
│  │                        StatusBar                           │ │
│  │   Ln:Col  │  chars/words  │  Modified indicator  │  UTF-8  │ │
│  └──────────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────────┘
```

**Data flow:** Session state serializes to JSON every 2 seconds → survives crashes. File I/O uses Electron IPC through a secure `contextBridge`. CodeMirror manages its own document model; React syncs metadata and cursor position via listener callbacks.

---

## Project Structure

```
pensivo/
├── main.js                      # Electron main process (menus, IPC, window mgmt)
├── preload.js                   # Context bridge — secure IPC surface
├── vite.config.js               # Vite + React plugin
├── index.html                   # SPA entry point
├── package.json                 # Dependencies, scripts, electron-builder config
├── .gitignore
├── docs/
│   └── index.html               # GitHub Pages landing page
└── src/
    ├── main.jsx                 # React mount point
    ├── App.jsx                  # Root component — tabs, state, layout orchestration
    ├── App.css                  # Complete design system (~140 CSS custom properties)
    └── components/
        ├── TabBar.jsx           # Tab strip with close/add buttons
        ├── EditorPane.jsx       # CodeMirror 6 React wrapper
        ├── FormatToolbar.jsx    # Markdown formatting toolbar
        ├── MarkdownPreview.jsx  # Live rendered Markdown pane
        ├── Sidebar.jsx          # Left sidebar with actions
        └── StatusBar.jsx        # Bottom status bar with cursor/count info
```

---

## Shortcuts

| Shortcut | Action |
|---|---|
| <kbd>Ctrl+N</kbd> | New note |
| <kbd>Ctrl+O</kbd> | Open file |
| <kbd>Ctrl+S</kbd> | Save |
| <kbd>Ctrl+Shift+S</kbd> | Save As |
| <kbd>Ctrl+W</kbd> | Close tab |
| <kbd>Ctrl+B</kbd> | Toggle sidebar |
| <kbd>Ctrl+Shift+P</kbd> | Toggle Markdown preview |
| <kbd>F12</kbd> | DevTools |

---

## Data Storage

Pensivo stores everything locally in your OS user data directory. No accounts, no cloud, no telemetry.

| Platform | Path |
|---|---|
| **Windows** | `%APPDATA%/pensivo/` |
| **macOS** | `~/Library/Application Support/pensivo/` |
| **Linux** | `~/.config/pensivo/` |

- `session.json` — all tab contents, language modes, and file paths
- `window-state.json` — position, size, and maximized state

---

## License

[MIT](LICENSE) — use it, fork it, ship it.

---

<br>
<div align="center">
  <sub>Built with Electron · React · CodeMirror 6</sub>
</div>
