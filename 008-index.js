const { app, BrowserWindow, ipcMain,globalShortcut,Notification,Tray,Menu } = require("electron/main");
const path = require("node:path");
const fs = require("node:fs");
const https = require("node:https");

let win = null

function createWindow() {
  win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, "008-preload.js"),
    },
  });

  win.loadFile("008-index.html");

  // 窗口监控
  win.on("maximize", () => {
    console.log("maximize");
  });

  win.on("unmaximize", () => {
    console.log("unmaximize");
  });

  win.on("will-resize", (event, newBounds) => {
    console.log(
      `window will resize, x=${newBounds.width}, y=${newBounds.height}`
    );
  });

  win.webContents.openDevTools();
}

const iconName = path.join(__dirname, "iconForDragAndDrop.png");
const icon = fs.createWriteStream(iconName);

// Create a new file to copy - you can also copy existing files.
fs.writeFileSync(
  path.join(__dirname, "drag-and-drop-1.md"),
  "# First file to test drag and drop"
);
fs.writeFileSync(
  path.join(__dirname, "drag-and-drop-2.md"),
  "# Second file to test drag and drop"
);

// 创建通知的函数
function createNotification(msg) {
  const notification = new Notification({
    title: '通知标题',
    body: msg
  });

  // 显示通知
  notification.show();
}

// 创建托盘图标的函数
function createTray() {
  const tray = new Tray(path.join(__dirname, 'logo.ico'));  // 托盘图标路径
  const contextMenu = Menu.buildFromTemplate([
    { label: '显示', click: () => win.show() },  // 显示窗口
    { label: '隐藏', click: () => win.hide() },  // 隐藏窗口
    { type: 'separator' },
    { label: '退出', click: () => app.quit() }  // 退出应用
  ]);

  // 设置托盘图标的提示文本和右键菜单
  tray.setToolTip('这是托盘图标');
  tray.setContextMenu(contextMenu);
}

https.get("https://img.icons8.com/ios/452/drag-and-drop.png", (response) => {
  response.pipe(icon);
});

app.whenReady().then(
  () => {
    // 快捷键
    globalShortcut.register('Alt+CommandOrControl+I', () => {
      createNotification('Electron loves global shortcuts!')
    })

    createWindow()
    createTray()
  }
)

ipcMain.on("ondragstart", (event, filePath) => {
  console.log(filePath);
  event.sender.startDrag({
    file: path.join(__dirname, filePath),
    icon: iconName,
  });
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});
