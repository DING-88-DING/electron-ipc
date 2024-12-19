const { app, BrowserWindow } = require("electron/main");

const { createAWindow } = require("./005-createWindow");

function createWindowOne() {
  createAWindow({
    name: "one",
    width: 1000,
    height: 800,
    loadFileUrl: "005-1-index.html",
    preloadUrl: "005-1-preload.js",
  });
}

function createWindowTwo() {
  createAWindow({
    name: "two",
    width: 800,
    height: 600,
    loadFileUrl: "005-2-index.html",
    preloadUrl: "005-2-preload.js",
  });
}

function createWindow() {
  createWindowOne();
  createWindowTwo();
}

app.whenReady().then(() => {
  createWindow();

  app.on("activate", function () {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on("window-all-closed", function () {
  if (process.platform !== "darwin") app.quit();
});
