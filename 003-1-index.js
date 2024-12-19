const { app, BrowserWindow, ipcMain, dialog } = require('electron/main')
const path = require('node:path')

function createWindow () {
  const mainWindow = new BrowserWindow({
    width: 1800,
    height: 1600,
    webPreferences: {
      preload: path.join(__dirname, '003-1-preload.js')
    }
  })
  mainWindow.loadFile('003-1-index.html')
  mainWindow.webContents.openDevTools()
}

app.whenReady().then(() => {
  ipcMain.on('synchronous-message', (event, arg) => {
    console.log(arg) // 在 Node 控制台中打印“ping”
    console.log('no return value')
    setTimeout(() => {
      // 请保证 event.returnValue 是有值的，否则会照成非预期的影响。
      // 点击第二次报错{error: 'reply was never sent'}
      event.returnValue = 'pong'
    },3000)
  })
  createWindow()
  app.on('activate', function () {
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit()
})