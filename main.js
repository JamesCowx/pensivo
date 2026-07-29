const { app, BrowserWindow, dialog, ipcMain, Menu, nativeTheme } = require('electron');
const path = require('path');
const fs = require('fs');

let mainWindow;
const isDev = process.argv.includes('--dev') || process.env.ELECTRON_IS_DEV === 'true';
const userDataPath = app.getPath('userData');
const sessionFile = path.join(userDataPath, 'session.json');
const windowStateFile = path.join(userDataPath, 'window-state.json');

nativeTheme.themeSource = 'dark';

function loadJSON(filePath, fallback) {
  try {
    if (fs.existsSync(filePath)) return JSON.parse(fs.readFileSync(filePath, 'utf-8'));
  } catch (_) {}
  return fallback;
}
function saveJSON(filePath, data) {
  try { fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf-8'); } catch (_) {}
}

function saveSession(tabs, activeTabId) {
  saveJSON(sessionFile, {
    tabs: tabs.map(t => ({
      name: t.name, content: t.content, language: t.language,
      filePath: t.filePath, modified: t.modified,
    })),
    activeTabId,
  });
}
function loadSession() { return loadJSON(sessionFile, null); }

function saveWindowState() {
  if (!mainWindow) return;
  const bounds = mainWindow.getBounds();
  saveJSON(windowStateFile, { ...bounds, maximized: mainWindow.isMaximized() });
}
function loadWindowState() { return loadJSON(windowStateFile, { width: 1200, height: 800 }); }

function createWindow() {
  const winState = loadWindowState();

  mainWindow = new BrowserWindow({
    width: winState.width || 1200,
    height: winState.height || 800,
    x: winState.x,
    y: winState.y,
    minWidth: 680,
    minHeight: 420,
    frame: false,
    backgroundColor: '#0a0a0f',
    show: false,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      contextIsolation: true,
      nodeIntegration: false,
    },
  });

  if (winState.maximized) mainWindow.maximize();
  mainWindow.once('ready-to-show', () => { mainWindow.show(); });

  mainWindow.on('resize', saveWindowState);
  mainWindow.on('move', saveWindowState);
  mainWindow.on('maximize', saveWindowState);
  mainWindow.on('unmaximize', saveWindowState);
  mainWindow.on('enter-full-screen', saveWindowState);
  mainWindow.on('leave-full-screen', saveWindowState);

  mainWindow.on('maximize', () => mainWindow.webContents.send('window:maximized', true));
  mainWindow.on('unmaximize', () => mainWindow.webContents.send('window:maximized', false));

  mainWindow.webContents.setWindowOpenHandler(() => ({ action: 'deny' }));

  const menuTemplate = [
    {
      label: 'File',
      submenu: [
        { label: 'New Note', accelerator: 'CmdOrCtrl+N', click: () => mainWindow?.webContents.send('menu:new') },
        { label: 'Open File...', accelerator: 'CmdOrCtrl+O', click: () => mainWindow?.webContents.send('menu:open') },
        { label: 'Save', accelerator: 'CmdOrCtrl+S', click: () => mainWindow?.webContents.send('menu:save') },
        { label: 'Save As...', accelerator: 'CmdOrCtrl+Shift+S', click: () => mainWindow?.webContents.send('menu:saveAs') },
        { type: 'separator' },
        { label: 'Close Tab', accelerator: 'CmdOrCtrl+W', click: () => mainWindow?.webContents.send('menu:closeTab') },
        { type: 'separator' },
        { role: 'quit' },
      ],
    },
    {
      label: 'Edit',
      submenu: [
        { role: 'undo' }, { role: 'redo' }, { type: 'separator' },
        { role: 'cut' }, { role: 'copy' }, { role: 'paste' }, { role: 'selectAll' },
      ],
    },
    {
      label: 'View',
      submenu: [
        { label: 'Toggle Sidebar', accelerator: 'CmdOrCtrl+B', click: () => mainWindow?.webContents.send('menu:toggleSidebar') },
        { label: 'Toggle Preview', accelerator: 'CmdOrCtrl+Shift+P', click: () => mainWindow?.webContents.send('menu:togglePreview') },
        { type: 'separator' },
        { role: 'togglefullscreen' },
        { type: 'separator' },
        { role: 'toggleDevTools' },
      ],
    },
    {
      label: 'Help',
      submenu: [
        {
          label: 'About Inkwell',
          click: () => {
            dialog.showMessageBox(mainWindow, {
              type: 'info', title: 'About Inkwell', message: 'Inkwell',
              detail: `Version ${app.getVersion()}\n\nA hybrid notes app.\nBuilt with Electron + React + CodeMirror 6.`,
            });
          },
        },
      ],
    },
  ];

  if (process.platform === 'darwin') {
    menuTemplate.unshift({
      label: app.name,
      submenu: [
        { role: 'about' }, { type: 'separator' }, { role: 'services' },
        { type: 'separator' }, { role: 'hide' }, { role: 'hideOthers' },
        { role: 'unhide' }, { type: 'separator' }, { role: 'quit' },
      ],
    });
  }

  Menu.setApplicationMenu(Menu.buildFromTemplate(menuTemplate));

  if (isDev) {
    mainWindow.loadURL('http://localhost:5173');
    mainWindow.webContents.openDevTools({ mode: 'bottom' });
  } else {
    mainWindow.loadFile(path.join(__dirname, 'dist', 'index.html'));
  }
}

app.whenReady().then(createWindow);
app.on('window-all-closed', () => { if (process.platform !== 'darwin') app.quit(); });
app.on('activate', () => { if (BrowserWindow.getAllWindows().length === 0) createWindow(); });
app.on('before-quit', saveWindowState);

ipcMain.handle('window:minimize', () => mainWindow?.minimize());
ipcMain.handle('window:maximize', () => {
  if (mainWindow?.isMaximized()) mainWindow.unmaximize();
  else mainWindow?.maximize();
});
ipcMain.handle('window:close', () => mainWindow?.close());
ipcMain.handle('window:isMaximized', () => mainWindow?.isMaximized());

ipcMain.handle('dialog:openFile', async () => {
  const result = await dialog.showOpenDialog(mainWindow, {
    properties: ['openFile'],
    filters: [
      { name: 'All Supported', extensions: ['txt', 'md', 'js', 'jsx', 'ts', 'tsx', 'py', 'html', 'css', 'json', 'xml', 'yaml', 'yml', 'csv', 'log', 'ini', 'cfg', 'env', 'gitignore'] },
      { name: 'Text Files', extensions: ['txt', 'md', 'log', 'csv'] },
      { name: 'Code Files', extensions: ['js', 'jsx', 'ts', 'tsx', 'py', 'html', 'css', 'json', 'xml', 'yaml', 'yml'] },
      { name: 'All Files', extensions: ['*'] },
    ],
  });
  if (result.canceled || result.filePaths.length === 0) return null;
  const filePath = result.filePaths[0];
  return { filePath, content: fs.readFileSync(filePath, 'utf-8'), fileName: path.basename(filePath) };
});

ipcMain.handle('dialog:saveFile', async (event, { filePath, content }) => {
  if (!filePath) {
    const result = await dialog.showSaveDialog(mainWindow, {
      defaultPath: 'untitled.md',
      filters: [
        { name: 'Markdown', extensions: ['md'] },
        { name: 'Text Files', extensions: ['txt'] },
        { name: 'All Files', extensions: ['*'] },
      ],
    });
    if (result.canceled) return null;
    filePath = result.filePath;
  }
  fs.writeFileSync(filePath, content, 'utf-8');
  return { filePath, fileName: path.basename(filePath) };
});

ipcMain.handle('dialog:confirmClose', async (event, { fileName }) => {
  const result = await dialog.showMessageBox(mainWindow, {
    type: 'warning',
    buttons: ['Save', 'Discard', 'Cancel'],
    defaultId: 0, cancelId: 2,
    title: 'Unsaved Changes',
    message: `"${fileName}" has unsaved changes.`,
    detail: 'Do you want to save before closing?',
  });
  return result.response;
});

ipcMain.handle('file:read', (event, filePath) => fs.readFileSync(filePath, 'utf-8'));
ipcMain.handle('file:write', (event, { filePath, content }) => fs.writeFileSync(filePath, content, 'utf-8'));
ipcMain.handle('session:save', (event, { tabs, activeTabId }) => saveSession(tabs, activeTabId));
ipcMain.handle('session:load', () => loadSession());
ipcMain.handle('app:getVersion', () => app.getVersion());
