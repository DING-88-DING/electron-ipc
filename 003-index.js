const { app, BrowserWindow, ipcMain, dialog } = require('electron/main')
const path = require('node:path')

async function handleFileOpen (event) {
  const { canceled, filePaths } = await dialog.showOpenDialog()

  // event.sender.send('get-file-path-info', '已经得到了文件路径')
  // 报错
  // event.reply('get-file-path-info', '已经得到了文件路径')

  if (!canceled) {
    return filePaths[0]
  }

  // return 111
}

function createWindow () {
  const mainWindow = new BrowserWindow({
    width: 1800,
    height: 1600,
    webPreferences: {
      preload: path.join(__dirname, '003-preload.js')
    }
  })
  mainWindow.loadFile('003-index.html')
  mainWindow.webContents.openDevTools()
}

app.whenReady().then(() => {
  ipcMain.handle('dialog:openFile', handleFileOpen)
  createWindow()
  app.on('activate', function () {
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit()
})