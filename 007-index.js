const { app, BrowserWindow, MessageChannelMain } = require("electron");
const path = require("path");

let windowA, windowB;

app.on("ready", () => {
  // 创建窗口 A
  windowA = new BrowserWindow({
    webPreferences: {
      contextIsolation: true, // 启用上下文隔离
      nodeIntegration: false,
      preload: path.join(__dirname, "007-1-preload.js"),
    },
  });
  windowA.loadFile("007-1-index.html");
  windowA.webContents.openDevTools();

  // 创建窗口 B
  windowB = new BrowserWindow({
    webPreferences: {
      contextIsolation: true, // 启用上下文隔离
      nodeIntegration: false,
      preload: path.join(__dirname, "007-2-preload.js"),
    },
  });
  windowB.loadFile("007-2-index.html");
  windowB.webContents.openDevTools();

  // 创建 MessageChannel
  const { port1, port2 } = new MessageChannelMain();
  console.log(port1, port2);

  // 将 port1 发送到窗口 A
  windowA.webContents.once("did-finish-load", () => {
    windowA.webContents.postMessage("channel-port", null, [port1]);
  });

  // 将 port2 发送到窗口 B
  windowB.webContents.once("did-finish-load", () => {
    windowB.webContents.postMessage("channel-port", null, [port2]);
  });

  app.on("activate", function () {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on("window-all-closed", function () {
  if (process.platform !== "darwin") app.quit();
});
