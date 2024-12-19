const { contextBridge, ipcRenderer } = require("electron/renderer");

contextBridge.exposeInMainWorld("electronAPI", {
  rendererSendToRenderer: (msg) =>
    ipcRenderer.send("renderer-send-to-renderer", {
      channel: "windowOne-send-to-windowTwo",
      targetWindow: "two",
      data: msg,
    }),
});
