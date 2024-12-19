// preload.js (渲染进程A)
const { contextBridge, ipcRenderer} = require('electron');

let port1 = null

contextBridge.exposeInMainWorld('channel', {
  sendMessageToB: (message) => {
    port1.postMessage(message);  // 发送消息到渲染进程B
  },
  initPort1: (callback) => {
    ipcRenderer.on('channel-port', (event) => {
      port1 = event.ports[0];  // 获取传递的 port2
      console.log('port1',port1);
      // callback(port1);
    });
  },
});
