const {app, BrowserWindow} = require('electron')

function createWindow () {
  const mainWindow = new BrowserWindow({
    width: 1366,
    height: 768,
    frame : true,
    backgroundColor: 'azure',
    resizable : false,
  })

  
mainWindow.loadFile('./index.html')
mainWindow.removeMenu()  
}

app.whenReady().then(createWindow)

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit()
})

app.on('activate', function () {
  if (BrowserWindow.getAllWindows().length === 0) createWindow()
})