const { app, BrowserWindow, ipcMain, dialog } = require("electron/main");
const path = require("node:path");

function createWindow() {
  const mainWindow = new BrowserWindow({
    width: 1800,
    height: 1600,
    webPreferences: {
      preload: path.join(__dirname, "006-preload.js"),
    },
  });
  mainWindow.loadFile("006-index.html");
  mainWindow.webContents.openDevTools();
}

app.whenReady().then(() => {
  // 1、主进程监听一个事件，渲染进程想要发送 port 的话，就能在这里获取到
  ipcMain.on("render-post-message-to-main", (event, params) => {
    console.log("render-port", params);

    // 2、获取到 port1
    const port1 = event.ports[0];

    // 3、需要调用一下 port1 的 start()
    port1.start();

    // 4、port1 绑定事件监听，之后渲染进程一发送的消息都会在这里接收到
    port1.on("message", (event) => {
      const data = event.data;
      console.log("main:", data);

      port1.postMessage("我是主进程通过 port1 回复的消息");
    });
  });
  createWindow();
  app.on("activate", function () {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on("window-all-closed", function () {
  if (process.platform !== "darwin") app.quit();
});
