<p align="center">
  <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="#6c8cff" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
    <path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/>
  </svg>
</p>

<h1 align="center">Inkwell</h1>

<p align="center">
  <strong>A modern, beautiful notes app for developers and writers.</strong>
  <br>
  Hybrid of Sticky Notes + Notepad++ — built with Electron, React, and CodeMirror 6.
</p>

<p align="center">
  <a href="#features">Features</a> •
  <a href="#download">Download</a> •
  <a href="#tech-stack">Tech Stack</a> •
  <a href="#how-it-works">How It Works</a> •
  <a href="#development">Development</a> •
  <a href="#building-from-source">Build from Source</a>
</p>

---

## Features

| | |
|---|---|
| **Tabbed Interface** | Multiple notes open simultaneously, switch between them like a pro |
| **Syntax Highlighting** | JavaScript, Python, HTML, CSS, JSON, Markdown, and more |
| **Markdown Preview** | Write in Markdown, toggle a live rendered preview |
| **Rich Formatting** | Bold, italic, headings, lists, code blocks — with a formatting toolbar |
| **File Management** | Open and save `.md`, `.txt`, `.js`, `.py`, and many more file types |
| **Dark Mode** | Premium dark theme optimized for long writing sessions |
| **Session Persistence** | Your tabs and content are restored automatically on relaunch |
| **Drag & Drop** | Drop files from Explorer directly into the app |
| **Auto-Save** | Session data saves every 2 seconds — never lose your work |
| **Custom Titlebar** | Frameless window with custom minimize, maximize, and close controls |
| **Status Bar** | Line/column position, character and word count, language, encoding |
| **Keyboard Shortcuts** | `Ctrl+N` New, `Ctrl+O` Open, `Ctrl+S` Save, `Ctrl+W` Close |
| **Cross-Platform** | Windows, macOS, and Linux support |

---

## Download

Get the latest release for your platform:

| Platform | Installer | Portable |
|---|---|---|
| **Windows** | [Inkwell-Setup-1.0.0.exe](https://github.com/yourusername/inkwell/releases/latest) | [Inkwell-Portable-1.0.0.exe](https://github.com/yourusername/inkwell/releases/latest) |
| **macOS** | [Inkwell-1.0.0.dmg](https://github.com/yourusername/inkwell/releases/latest) | — |
| **Linux** | [Inkwell-1.0.0.AppImage](https://github.com/yourusername/inkwell/releases/latest) | [Inkwell-1.0.0.tar.gz](https://github.com/yourusername/inkwell/releases/latest) |

> ⚡ **Portable version** requires no installation — just download and run.

---

## Tech Stack

| Layer | Technology |
|---|---|
| **Desktop Shell** | [Electron](https://www.electronjs.org/) |
| **UI Framework** | [React 19](https://react.dev/) |
| **Editor** | [CodeMirror 6](https://codemirror.net/) |
| **Language Support** | CodeMirror grammars for JS, Python, HTML, CSS, JSON, Markdown |
| **Markdown Rendering** | [marked](https://marked.js.org/) |
| **Bundler** | [Vite](https://vitejs.dev/) |
| **Packaging** | [electron-builder](https://www.electron.build/) |
| **Theme** | One Dark (CodeMirror) + custom CSS design system |
| **Typography** | Inter (UI), JetBrains Mono (code) |

---

## How It Works

### Architecture

```
┌─────────────────────────────────────────────────────┐
│                    Electron Main                     │
│  ┌──────────┐  ┌──────────┐  ┌───────────────────┐  │
│  │ App Menu  │  │  IPC     │  │  Session Mgmt     │  │
│  │ File/Edit │◄─┤ Handlers │──┤  (save/restore)   │  │
│  │ View/Help │  │          │  │  Window State     │  │
│  └──────────┘  └────┬─────┘  └───────────────────┘  │
│                      │                               │
├──────────────────────┴──────────────────────────────┤
│                 Renderer (React)                     │
│  ┌─────────┐  ┌──────────┐  ┌──────────────────┐    │
│  │ Sidebar  │  │  TabBar   │  │  FormatToolbar   │    │
│  │ (nav)    │  │ (tabs)    │  │ (markdown help)  │    │
│  └────┬────┘  └────┬─────┘  └────────┬─────────┘    │
│       │            │                  │              │
│  ┌────┴────────────┴──────────────────┴──────────┐   │
│  │              EditorPane                        │   │
│  │         (CodeMirror 6 + syntax highlight)      │   │
│  └────────────────────┬──────────────────────────┘   │
│                       │                              │
│  ┌────────────────────┴──────────────────────────┐   │
│  │              MarkdownPreview                   │   │
│  │         (marked → sanitized HTML render)       │   │
│  └───────────────────────────────────────────────┘   │
│  ┌──────────────────────────────────────────────┐   │
│  │                 StatusBar                     │   │
│  │  Ln:Col  │  chars/words  │  Modified  │  UTF-8│   │
│  └───────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────┘
```

### Data Flow

1. **Session persistence**: Tab content and metadata are serialized to `session.json` in the user's app data directory (`%APPDATA%/inkwell/`). Auto-save triggers every 2 seconds after changes, ensuring recovery on restart.

2. **File operations**: Opening and saving files uses the native OS dialogs via Electron IPC. File paths are tracked per tab; saving an untitled file prompts the "Save As" dialog.

3. **Editor state**: CodeMirror 6 manages its own document model and selection state. The React layer subscribes to content changes via `onChange` and cursor position via `EditorView.updateListener`.

4. **Formatting**: The format toolbar operates directly on the CodeMirror view, dispatching `changes` transactions that modify selected text or insert templates at the cursor.

5. **Window state**: Position, size, and maximized state are persisted to `window-state.json` and restored on launch. The frameless window uses a custom titlebar with SVG window controls that call IPC methods.

---

## Development

### Prerequisites

- [Node.js](https://nodejs.org/) 18+
- npm 9+

### Setup

```bash
git clone https://github.com/yourusername/inkwell.git
cd inkwell
npm install
```

### Run in development mode

```bash
npm run dev
```

This starts Vite's dev server (hot module reload) and launches the Electron window pointing to it.

### Keyboard shortcuts during development

| Shortcut | Action |
|---|---|
| `Ctrl+N` | New note |
| `Ctrl+O` | Open file |
| `Ctrl+S` | Save |
| `Ctrl+Shift+S` | Save As |
| `Ctrl+W` | Close tab |
| `Ctrl+B` | Toggle sidebar |
| `Ctrl+Shift+P` | Toggle markdown preview |
| `F12` / `Ctrl+Shift+I` | DevTools |

---

## Building from Source

### Windows

```bash
npm run build
```

Output: `release/Inkwell Setup 1.0.0.exe` (installer) + `release/Inkwell-Portable-1.0.0.exe` (portable)

### macOS

```bash
npm run build:mac
```

### Linux

```bash
npm run build:linux
```

### Package only (no distribution)

```bash
npm run pack
```

---

## Project Structure

```
inkwell/
├── main.js                 # Electron main process
├── preload.js              # Context bridge (secure IPC)
├── vite.config.js          # Vite bundler config
├── index.html              # Entry HTML
├── package.json
├── .gitignore
├── README.md
├── docs/                   # GitHub Pages site
│   └── index.html
└── src/
    ├── main.jsx            # React entry point
    ├── App.jsx             # Root component + state management
    ├── App.css             # Complete design system
    └── components/
        ├── TabBar.jsx      # Tab navigation bar
        ├── EditorPane.jsx  # CodeMirror 6 wrapper
        ├── FormatToolbar.jsx # Markdown formatting toolbar
        ├── MarkdownPreview.jsx # Live preview pane
        ├── Sidebar.jsx     # Navigation sidebar
        └── StatusBar.jsx   # Status bar (Ln/Col, counts)
```

---

## Configuration

Inkwell stores its data in the standard OS user data directory:

| OS | Path |
|---|---|
| Windows | `%APPDATA%/inkwell/` |
| macOS | `~/Library/Application Support/inkwell/` |
| Linux | `~/.config/inkwell/` |

Files:

- `session.json` — tab content, language mode, file paths
- `window-state.json` — window position, size, maximized state

---

## License

[MIT](LICENSE)

---

<p align="center">
  <sub>Built with ❤️ using Electron, React, and CodeMirror 6</sub>
</p>
