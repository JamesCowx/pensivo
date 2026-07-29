<div align="center">
  <br>
  <svg width="80" height="80" viewBox="0 0 32 32" fill="none">
    <defs>
      <linearGradient id="pg" x1="2" y1="2" x2="30" y2="30" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stop-color="#6c8cff"/>
        <stop offset="50%" stop-color="#a277ff"/>
        <stop offset="100%" stop-color="#ff6c8c"/>
      </linearGradient>
    </defs>
    <rect x="4" y="4" width="24" height="24" rx="6" stroke="url(#pg)" stroke-width="2" fill="none"/>
    <line x1="10" y1="12" x2="22" y2="12" stroke="url(#pg)" stroke-width="2" stroke-linecap="round"/>
    <line x1="10" y1="16" x2="20" y2="16" stroke="#a277ff" stroke-width="1.5" stroke-linecap="round" opacity="0.6"/>
    <line x1="10" y1="20" x2="17" y2="20" stroke="#a277ff" stroke-width="1.5" stroke-linecap="round" opacity="0.4"/>
    <path d="M21 18l-3 3-3-3" stroke="#6c8cff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    <line x1="18" y1="21" x2="18" y2="24" stroke="#6c8cff" stroke-width="1.5" stroke-linecap="round"/>
  </svg>
  <h1>Pensivo</h1>
  <p>
    <sup><em>pen·SEE·vo</em> · Italian for <strong>"thoughtful, pensive"</strong></sup>
  </p>
  <br>
  <p>
    Where ideas take shape.<br>
    A desktop notes app that feels like an extension of your mind —<br>
    <strong>dark, fast, and impossibly refined.</strong>
  </p>
  <br>
  <p>
    <a href="https://github.com/JamesCowx/pensivo/releases/latest">
      <img src="https://img.shields.io/github/v/release/JamesCowx/pensivo?include_prereleases&label=latest&color=6c8cff&style=flat-square&logo=github&logoColor=white" alt="Latest Release">
    </a>
    <a href="https://github.com/JamesCowx/pensivo/blob/master/LICENSE">
      <img src="https://img.shields.io/github/license/JamesCowx/pensivo?color=a277ff&style=flat-square" alt="License: MIT">
    </a>
    <a href="https://github.com/JamesCowx/pensivo/stargazers">
      <img src="https://img.shields.io/github/stars/JamesCowx/pensivo?color=ffca4d&style=flat-square" alt="Stars">
    </a>
    <a href="https://github.com/JamesCowx/pensivo/releases">
      <img src="https://img.shields.io/github/downloads/JamesCowx/pensivo/total?color=56d364&style=flat-square" alt="Downloads">
    </a>
    <a href="https://github.com/JamesCowx/pensivo/actions">
      <img src="https://img.shields.io/badge/platform-windows%20%7C%20macos%20%7C%20linux-8b949e?style=flat-square" alt="Platform">
    </a>
  </p>
</div>

<br>

---

<br>

## The Problem

Modern note-taking has become a battlefield of extremes. On one side: apps so barebones you can't even switch between two thoughts without losing context. On the other: bloated knowledge-management platforms that demand a PhD to configure, sync your data to servers you don't control, and start slower than your operating system.

**Pensivo ignores the fight entirely.** It's not a sticky note, a wiki, or a "second brain." It's a writing instrument — as deliberate and responsive as a fountain pen, as powerful as the editor you code in all day.

<br>

---

<br>

<div align="center">
  <h2>What Makes It Different</h2>
</div>

<table>
  <tr>
    <td valign="top" width="50%">
      <h3>🌙 <em>Dark</em> Is the Default</h3>
      <p>Not a toggle you fumble for. The entire interface — 140+ CSS custom properties — was designed for a dark canvas from the very first line of code. Light mode isn't a checkbox. It's simply not needed. Your eyes will thank you at 2 AM when you're writing your best work.</p>
    </td>
    <td valign="top" width="50%">
      <h3>⚡ <em>Fast</em> Isn't a Feature. It's the Baseline.</h3>
      <p>No Electron bloat. No splash screen. No "loading your workspace." Pensivo opens in under a second, restores every tab you had open, and gets out of your way. The editor is CodeMirror 6 — the same engine that powers VS Code's text buffer — rendering at 60fps even with thousands of lines.</p>
    </td>
  </tr>
  <tr>
    <td valign="top">
      <h3>🔒 <em>Yours</em> Means Yours</h3>
      <p>No accounts. No cloud. No telemetry. No analytics. Not even an internet permission. Everything you write stays on your machine in plain JSON files inside your OS user data directory. Sync it yourself with whatever tool you trust — or don't sync it at all. It's your data. Pensivo just gives it a beautiful home.</p>
    </td>
    <td valign="top">
      <h3>🧘 <em>Thoughtful</em> by Design</h3>
      <p>Every interaction was chosen deliberately. Tabs appear where you expect them. The sidebar collapses with a keystroke. Markdown preview toggles without leaving the keyboard. The titlebar is custom because the OS one ruins the aesthetic. Pensivo respects your flow — it doesn't interrupt it with dialogs, popups, or "what's new" banners.</p>
    </td>
  </tr>
</table>

<br>

---

<br>

<div align="center">
  <h2>Capabilities</h2>
</div>

<table>
  <tr align="center">
    <td width="25%"><h3>📑</h3><p><strong>Tabbed Workspace</strong></p></td>
    <td width="25%"><h3>🎨</h3><p><strong>Syntax Highlighting</strong></p></td>
    <td width="25%"><h3>👁️</h3><p><strong>Live Preview</strong></p></td>
    <td width="25%"><h3>📝</h3><p><strong>Format Bar</strong></p></td>
  </tr>
  <tr>
    <td valign="top">Multiple documents open simultaneously. Switch, reorder, and close with keyboard shortcuts. Each tab remembers its language mode and file path independently.</td>
    <td valign="top">JavaScript, TypeScript, Python, HTML, CSS, JSON, Markdown, YAML, XML, CSV — language auto-detected from the file extension at open time.</td>
    <td valign="top">Write Markdown, tap <kbd>Ctrl+Shift+P</kbd>, and watch it render live. Headings, lists, code blocks, tables, links — all rendered faithfully by <code>marked</code>.</td>
    <td valign="top">Bold, italic, headings, bullet lists, numbered lists, code fences, and hyperlinks — one click inserts proper Markdown syntax around your selection.</td>
  </tr>
  <tr><td colspan="4"><br></td></tr>
  <tr align="center">
    <td><h3>💾</h3><p><strong>Auto-Save</strong></p></td>
    <td><h3>📂</h3><p><strong>File Ops</strong></p></td>
    <td><h3>🪟</h3><p><strong>Frameless</strong></p></td>
    <td><h3>⌨️</h3><p><strong>Keyboard-First</strong></p></td>
  </tr>
  <tr>
    <td valign="top">Every 2 seconds, your session — all tabs, all content, all file paths — serializes to disk. Crash the app, reboot your machine, or kill the process. Pensivo restores everything exactly as it was.</td>
    <td valign="top">Open files via <kbd>Ctrl+O</kbd> native dialog. Save with <kbd>Ctrl+S</kbd>. Save As with <kbd>Ctrl+Shift+S</kbd>. Drag and drop from Explorer or Finder. It just works.</td>
    <td valign="top">Custom-drawn titlebar with SVG window controls (minimize, maximize/restore, close). Looks native. Behaves native. No Electron chrome-artifact ugliness.</td>
    <td valign="top"><kbd>Ctrl+N</kbd> new tab. <kbd>Ctrl+W</kbd> close tab. <kbd>Ctrl+B</kbd> toggle sidebar. <kbd>Ctrl+Shift+P</kbd> toggle preview. Every action within two keystrokes of home row.</td>
  </tr>
</table>

<br>

---

<br>

<div align="center">
  <h2>Get It</h2>
</div>

<div align="center">

[![Download Windows Installer](https://img.shields.io/badge/Windows-Installer-6c8cff?style=for-the-badge&logo=windows&logoColor=white)](https://github.com/JamesCowx/pensivo/releases/latest/download/Pensivo-Setup-1.0.0.exe)

[![Download Portable](https://img.shields.io/badge/Windows-Portable_·_No_Install-a277ff?style=for-the-badge&logo=windows&logoColor=white)](https://github.com/JamesCowx/pensivo/releases/latest/download/Pensivo-Portable-1.0.0.exe)

<sub>Just download and run. No installer? Grab the portable. It's a single `.exe`.</sub>

</div>

<br>

<details>
  <summary><strong>Build from Source</strong></summary>
  <br>

  ```bash
  git clone https://github.com/JamesCowx/pensivo.git
  cd pensivo
  npm install
  npm run dev          # development mode with hot reload
  npm run build        # production build → release/
  ```

  **Prerequisites:** Node.js 18+, npm 9+

</details>

<br>

---

<br>

<div align="center">
  <h2>Under the Hood</h2>
</div>

```
   ┌──────────────────────────────────────────────────────────────┐
   │                     Electron Main Process                    │
   │                                                              │
   │   ┌───────────┐     ┌────────────┐     ┌────────────────┐   │
   │   │  Menu Bar  │────▶│  IPC Layer  │────▶│   Session/     │   │
   │   │  (native)  │◀────│  (preload)   │◀────│   Window State  │   │
   │   └───────────┘     └─────┬──────┘     └────────────────┘   │
   │                           │                                   │
   │   ◄───────────────────────┴─────────────────────────────────►│
   │                    secure contextBridge                       │
   ├──────────────────────────────────────────────────────────────┤
   │                     Renderer Process (React 19)               │
   │                                                               │
   │   ┌─────────┐  ┌──────────┐  ┌──────────────┐               │
   │   │ Sidebar  │  │  TabBar   │  │  FormatBar    │              │
   │   └────┬────┘  └────┬─────┘  └──────┬───────┘              │
   │        │            │               │                         │
   │   ┌────┴────────────┴───────────────┴──────────────────────┐ │
   │   │                   CodeMirror 6                          │ │
   │   │       · Extension-based architecture                    │ │
   │   │       · One Dark theme                                  │ │
   │   │       · Language grammars for 10+ formats               │ │
   │   │       · 60fps viewport rendering                        │ │
   │   └───────────────────────┬─────────────────────────────────┘ │
   │                           │                                    │
   │   ┌───────────────────────┴─────────────────────────────────┐ │
   │   │              MarkdownPreview (toggle)                    │ │
   │   │       marked → sanitized HTML → live render              │ │
   │   └─────────────────────────────────────────────────────────┘ │
   │   ┌─────────────────────────────────────────────────────────┐ │
   │   │                     StatusBar                             │ │
   │   │   Ln 42, Col 17  │  1,247 chars  │  198 words  │  UTF-8   │ │
   │   └─────────────────────────────────────────────────────────┘ │
   └──────────────────────────────────────────────────────────────┘
```

<div align="center">
  <sub>
    Data flows one direction — React state down, CodeMirror changes up.<br>
    The session serializes to JSON every 2 seconds. Files open through native OS dialogs.<br>
    The preload script exposes a minimal, typed surface. No <code>nodeIntegration</code>. No <code>remote</code>.
  </sub>
</div>

<br>

---

<br>

<div align="center">
  <h2>Tech Stack</h2>
</div>

| Layer | Package | What It Does |
|---|---|---|
| **Desktop** | Electron 43 | Cross-platform windowing, native menus, IPC, file dialogs |
| **UI** | React 19 | Component tree, state management, effect orchestration |
| **Editor Core** | CodeMirror 6 | Document model, decorations, transactions, viewport |
| **Languages** | `@codemirror/lang-*` | JS/TS · Python · HTML · CSS · JSON · Markdown |
| **Theme** | One Dark + Custom | 140+ CSS custom properties, gradient accents, animations |
| **Markdown** | marked | Parses Markdown → sanitized HTML → preview pane |
| **Bundler** | Vite 8 | Dev server with HMR, production rollup, sub-400ms builds |
| **Packaging** | electron-builder | NSIS installer, portable EXE, DMG, AppImage |
| **Typography** | Inter + JetBrains Mono | UI text (400–700) · monospace code (400–500) |

<br>

---

<br>

<div align="center">
  <h2>Project Structure</h2>
</div>

```
pensivo/
│
├── main.js               ← Electron main — menus, IPC handlers, window lifecycle
├── preload.js            ← contextBridge — the only surface between main & renderer
├── vite.config.js        ← Vite + React plugin
├── index.html            ← SPA shell
├── package.json          ← scripts, dependencies, electron-builder config
│
├── docs/
│   └── index.html        ← GitHub Pages landing page
│
├── src/
│   ├── main.jsx          ← ReactDOM.createRoot entry
│   ├── App.jsx           ← Root component — tabs, layout, keyboard bindings
│   ├── App.css           ← Design system — 140+ custom properties, 700+ lines
│   │
│   └── components/
│       ├── TabBar.jsx         ← Tab strip: labels, close buttons, new-tab button
│       ├── EditorPane.jsx     ← CodeMirror 6 → React bridge (ref forwarding)
│       ├── FormatToolbar.jsx  ← Insert bold, italic, headings, lists, code, links
│       ├── MarkdownPreview.jsx ← marked render pipeline: parse → sanitize → display
│       ├── Sidebar.jsx        ← Actions panel: new, open, save, language selector
│       └── StatusBar.jsx      ← Cursor position, word/char counts, modified status
│
└── release/
    ├── Pensivo Setup 1.0.0.exe        ← NSIS installer
    └── Pensivo-Portable-1.0.0.exe     ← Single-file portable build
```

<br>

---

<br>

<div align="center">
  <h2>Keyboard Shortcuts</h2>
</div>

<table align="center">
  <tr><td align="right"><kbd>Ctrl</kbd> + <kbd>N</kbd></td><td width="20"></td><td>New note</td></tr>
  <tr><td align="right"><kbd>Ctrl</kbd> + <kbd>O</kbd></td><td></td><td>Open file</td></tr>
  <tr><td align="right"><kbd>Ctrl</kbd> + <kbd>S</kbd></td><td></td><td>Save</td></tr>
  <tr><td align="right"><kbd>Ctrl</kbd> + <kbd>Shift</kbd> + <kbd>S</kbd></td><td></td><td>Save As</td></tr>
  <tr><td align="right"><kbd>Ctrl</kbd> + <kbd>W</kbd></td><td></td><td>Close tab</td></tr>
  <tr><td align="right"><kbd>Ctrl</kbd> + <kbd>B</kbd></td><td></td><td>Toggle sidebar</td></tr>
  <tr><td align="right"><kbd>Ctrl</kbd> + <kbd>Shift</kbd> + <kbd>P</kbd></td><td></td><td>Toggle Markdown preview</td></tr>
  <tr><td align="right"><kbd>F12</kbd></td><td></td><td>Developer Tools</td></tr>
</table>

<br>

---

<br>

<div align="center">
  <h2>Data & Privacy</h2>
  <p>
    <strong>Everything is local.</strong> Pensivo stores two files in your OS application data directory:
  </p>
  <p>
    <code>session.json</code> — all tab contents, language modes, file paths<br>
    <code>window-state.json</code> — window position, size, maximized state
  </p>
  <p>
    <strong>No accounts. No cloud. No telemetry. No analytics. No network requests.</strong><br>
    <sub>Sync the files yourself with Dropbox, Syncthing, or Git if you want multi-machine access.</sub>
  </p>
</div>

| Platform | Data Location |
|---|---|
| **Windows** | `%APPDATA%\pensivo\` |
| **macOS** | `~/Library/Application Support/pensivo/` |
| **Linux** | `~/.config/pensivo/` |

<br>

---

<br>

<div align="center">
  <h2>License</h2>
  <img src="https://img.shields.io/badge/license-MIT-a277ff?style=flat-square" alt="MIT License">
  <p>
    <strong>MIT</strong> — take it, fork it, build on it, ship it.<br>
    <sub>Copyright &copy; 2026 James Cowx. See <a href="https://github.com/JamesCowx/pensivo/blob/master/LICENSE">LICENSE</a> for the full text.</sub>
  </p>
</div>

<br>

---

<br>

<div align="center">
  <p>
    <sub>
      Built with <strong>Electron</strong> · <strong>React 19</strong> · <strong>CodeMirror 6</strong> · <strong>Vite 8</strong><br>
      Made by <a href="https://github.com/JamesCowx">James Cowx</a>
    </sub>
  </p>
  <br>
</div>
