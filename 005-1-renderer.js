const btn = document.getElementById('btn')

btn.addEventListener('click', () => {
  window.electronAPI.rendererSendToRenderer('窗口1窗口2发送消息')
})
console.log(window)