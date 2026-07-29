const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electronAPI', {
  minimize: () => ipcRenderer.invoke('window:minimize'),
  maximize: () => ipcRenderer.invoke('window:maximize'),
  close: () => ipcRenderer.invoke('window:close'),
  isMaximized: () => ipcRenderer.invoke('window:isMaximized'),

  openFile: () => ipcRenderer.invoke('dialog:openFile'),
  saveFile: (data) => ipcRenderer.invoke('dialog:saveFile', data),
  confirmClose: (data) => ipcRenderer.invoke('dialog:confirmClose', data),
  readFile: (filePath) => ipcRenderer.invoke('file:read', filePath),
  writeFile: (filePath, content) => ipcRenderer.invoke('file:write', { filePath, content }),

  saveSession: (data) => ipcRenderer.invoke('session:save', data),
  loadSession: () => ipcRenderer.invoke('session:load'),
  getVersion: () => ipcRenderer.invoke('app:getVersion'),

  onMaximized: (callback) => {
    const handler = (event, val) => callback(val);
    ipcRenderer.on('window:maximized', handler);
    return () => ipcRenderer.removeListener('window:maximized', handler);
  },

  onMenuAction: (callback) => {
    const handler = (event, action) => callback(action);
    ipcRenderer.on('menu:new', handler);
    ipcRenderer.on('menu:open', handler);
    ipcRenderer.on('menu:save', handler);
    ipcRenderer.on('menu:saveAs', handler);
    ipcRenderer.on('menu:closeTab', handler);
    ipcRenderer.on('menu:toggleSidebar', handler);
    ipcRenderer.on('menu:togglePreview', handler);
    return () => {
      ipcRenderer.removeListener('menu:new', handler);
      ipcRenderer.removeListener('menu:open', handler);
      ipcRenderer.removeListener('menu:save', handler);
      ipcRenderer.removeListener('menu:saveAs', handler);
      ipcRenderer.removeListener('menu:closeTab', handler);
      ipcRenderer.removeListener('menu:toggleSidebar', handler);
      ipcRenderer.removeListener('menu:togglePreview', handler);
    };
  },
});
