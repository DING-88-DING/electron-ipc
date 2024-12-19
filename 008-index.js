const { app, BrowserWindow, ipcMain,globalShortcut } = require("electron/main");
const path = require("node:path");
const fs = require("node:fs");
const https = require("node:https");

function createWindow() {
  const win = new BrowserWindow({
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

https.get("https://img.icons8.com/ios/452/drag-and-drop.png", (response) => {
  response.pipe(icon);
});

app.whenReady().then(
  () => {
    // 快捷键
    globalShortcut.register('Alt+CommandOrControl+I', () => {
      console.log('Electron loves global shortcuts!')
    })
  }
).then(createWindow);

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
