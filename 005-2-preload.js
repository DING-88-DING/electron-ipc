const { contextBridge, ipcRenderer } = require('electron/renderer')

contextBridge.exposeInMainWorld('electronAPI', {
  onWindowOneSendToWindowTwo: (callback) => ipcRenderer.on('windowOne-send-to-windowTwo', (_event, value) => callback(value)),
})