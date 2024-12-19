const btn = document.getElementById('btn')

btn.addEventListener('click', async () => {
  const pendingFilePath = window.electronAPI.synchronousMessage()
  // 会等待
  console.log(pendingFilePath)
})