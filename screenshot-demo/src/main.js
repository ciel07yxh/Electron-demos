const electron = require('electron')
const url = require('url')
const path = require('path')

const { app, BrowserWindow, globalShortcut} = electron

let mainWindow

app.on('ready', _ => {
    mainWindow = new BrowserWindow({
        width: 1000,
        height: 1000,
        resizable: false,
        frame: false
    })

    mainWindow.openDevTools()

    // mainWindow.loadURL(`file://${__dirname}/capture.html`)
    mainWindow.loadURL(url.format({
        pathname:path.join(__dirname,'capture.html'),
        protocol:'file:'
        }));

    mainWindow.on('closed', _ => {
        mainWindow = null
    })

    globalShortcut.register('ctrl+Shift+D', _ => {
        console.log('Got shortcut')
        console.log(app.getPath('pictures'))
        mainWindow.webContents.send('capture', './pictures')
    })
})

