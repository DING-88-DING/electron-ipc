const { BrowserWindow } = require("electron");
// 一、引入 windowManager
const {
  registerWindowContents,
  removeWindowContents,
} = require("./005-windowManager");
const path = require("node:path");

/**
 * 公共的创建窗口的方法
 * @param {*} params 参数
 */
exports.createAWindow = function (params) {
  const { name, width, height, loadFileUrl,preloadUrl } = params;
  const window = new BrowserWindow({
    name,
    width,
    height,
    webPreferences: {
      preload:path.join(__dirname, preloadUrl)
    },
  });

  window.loadFile(loadFileUrl);

  window.webContents.openDevTools();

  // 二、注册 webContents
  window.webContents.on("did-finish-load", () => {
    registerWindowContents(name, window.webContents);
  });
  // 三、销毁 webContents
  window.webContents.on("destroyed", () => {
    removeWindowContents(name);
  });
};
