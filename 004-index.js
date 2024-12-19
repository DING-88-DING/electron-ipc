const { app, BrowserWindow, Menu, ipcMain } = require('electron/main')
const path = require('node:path')

function createWindow () {
  const mainWindow = new BrowserWindow({
    webPreferences: {
      preload: path.join(__dirname, '004-preload.js')
    }
  })

  // 使用webContents.send方法来向特定的渲染器进程发送信息。这通常在BrowserWindow对象创建后完成。
  const menu = Menu.buildFromTemplate([
    {
      label: app.name,
      submenu: [
        {
          click: () => mainWindow.webContents.send('update-counter', 1),
          label: 'Increment'
        },
        {
          click: () => mainWindow.webContents.send('update-counter', -1),
          label: 'Decrement'
        }
      ]
    }

  ])

  Menu.setApplicationMenu(menu)
  mainWindow.loadFile('004-index.html')

  // Open the DevTools.
  mainWindow.webContents.openDevTools()
}

app.whenReady().then(() => {
  ipcMain.on('counter-value', (_event, value) => {
    console.log(value)
    // ipcMain.handle事件中，不存在event.reply方法，所以只能用event.sender.send。
    // 渲染器进程发送消息给主进程之后在向渲染器进程发送消息
    // _event.sender.send('form-main-process', 'Hello from Main Process')
    _event.reply('form-main-process', 'Hello from Main Process')
  })
  createWindow()

  app.on('activate', function () {
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit()
})