// preload.js (渲染进程A)
const { contextBridge, ipcRenderer} = require('electron');

contextBridge.exposeInMainWorld('channel', {
  initPort2: (callback) => {
    ipcRenderer.on('channel-port', (event) => {
      const port2 = event.ports[0];  // 获取传递的 port2
      console.log('port2',port2);
      port2.onmessage = (e) => {
        callback(e.data);  // 处理来自渲染进程A的消息
      }
    });
  }
});
