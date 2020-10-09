const electron = require('electron')

const { app, BrowserWindow } = electron

let mainWindow = null

app.on('ready', _ => {
    mainWindow = new BrowserWindow({
        width: 1200,
        height: 725,
        resizable: false
    })

    mainWindow.loadURL(url.format({
        pathname:path.join(__dirname,'capture.html'),
        protocol:'file:'
        }));

    mainWindow.webContents.openDevTools()

    mainWindow.on('closed', _ => {
        mainWindow = null
    })
})