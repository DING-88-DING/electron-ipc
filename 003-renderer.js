const btn = document.getElementById('btn')
const filePathElement = document.getElementById('filePath')

btn.addEventListener('click', async () => {
  const pendingFilePath = window.electronAPI.openFile()
  console.log(pendingFilePath)
  const filePath = await pendingFilePath
  filePathElement.innerText = filePath
})

window.electronAPI.getFilePathInfo(info => {
  console.log(info)
})