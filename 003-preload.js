const { contextBridge, ipcRenderer } = require("electron/renderer");

contextBridge.exposeInMainWorld("electronAPI", {
  openFile: () => ipcRenderer.invoke("dialog:openFile"),

  getFilePathInfo: (callback) =>
    ipcRenderer.on("get-file-path-info", (_event, value) => callback(value)),
});
