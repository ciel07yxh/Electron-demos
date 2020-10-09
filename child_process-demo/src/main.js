const electron = require('electron')
const path = require('path')
const url = require('url')

const { app, BrowserWindow, openDevTools } = electron

let mainWindow

app.on('ready', _ => {
    mainWindow = new BrowserWindow({
        width: 400,
        height: 100
    })

    mainWindow.openDevTools()

    mainWindow.loadURL(url.format({
        pathname:path.join(__dirname,'status.html'),
        protocol:'file:'
        }));

    mainWindow.on('closed', _ => {
        mainWindow = null
    })

})