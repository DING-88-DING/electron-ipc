const { contextBridge, ipcRenderer } = require("electron/renderer");

contextBridge.exposeInMainWorld("electronAPI", {
  setTitle: (title) => ipcRenderer.send("set-title", title),

  titleResponse: (callback) =>
    ipcRenderer.on("title-response", (_event, value) => callback(value)),
});
