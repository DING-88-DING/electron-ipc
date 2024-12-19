const { contextBridge, ipcRenderer } = require("electron/renderer");

contextBridge.exposeInMainWorld("electronAPI", {
  synchronousMessage: () => ipcRenderer.sendSync("synchronous-message",'ping'),
});
