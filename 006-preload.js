const { contextBridge, ipcRenderer } = require('electron');

let port = null;

contextBridge.exposeInMainWorld('bridge', {
  sendPortToMain: (callback) => {
    const { port1, port2 } = new MessageChannel();
    port2.postMessage('init msg')
    // 向主进程发送消息并传递 port1
    ipcRenderer.postMessage(
      'render-post-message-to-main',
      '我是渲染进程通过 ipcRenderer.postMessage 发送过来的',
      [port1],
    );
    console.log(port2)
    port2.onmessage = (event) => {
      const data = event.data;
      callback(data); // 调用渲染进程提供的回调函数
    };
    port = port2;
  },
  sendMessageToMain: (message) => {
    if (port) {
      port.postMessage(message);
    } else {
      console.error('端口没有初始化');
    }
  },
});
