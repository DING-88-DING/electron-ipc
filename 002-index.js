const { app, BrowserWindow, ipcMain } = require('electron/main')
const path = require('node:path')

function createWindow () {
  const mainWindow = new BrowserWindow({
    webPreferences: {
      preload: path.join(__dirname, '002-preload.js')
    }
  })

  ipcMain.on('set-title', (event, title) => {
    // 从event对象获取发送消息的渲染进程的webContents
    const webContents = event.sender
    // 找到与该webContents相关联的BrowserWindow实例
    const win = BrowserWindow.fromWebContents(webContents)
    win.setTitle(title)

    // 应答
    // event.reply('title-response', '已设置标题')
    event.sender.send('title-response', '已设置标题')
  })

  mainWindow.loadFile('002-index.html')

  mainWindow.webContents.openDevTools()
}

app.whenReady().then(() => {
  createWindow()

  app.on('activate', function () {
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit()
})