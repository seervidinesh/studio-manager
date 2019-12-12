const { BrowserWindow, app } = require('electron')
require('./index')

let mainWindow = null

function main() {
  mainWindow = new BrowserWindow({ width: 1280, height: 800, minWidth: 1280, minHeight: 800 })
  mainWindow.loadURL(`http://localhost:3000/`)
  mainWindow.on('close', event => {
    mainWindow = null
  })
}
app.disableHardwareAcceleration()
app.on('ready', main)