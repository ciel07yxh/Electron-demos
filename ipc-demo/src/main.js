const electron = require('electron')
const url = require('url')
const path = require('path')
const countdown = require('./countdown')
const { inspect } = require('util')

const app = electron.app
const BrowserWindow = electron.BrowserWindow
const ipc = electron.ipcMain

// let mainWindow
const windows = []

app.on('ready', _ => {
    // mainWindow = new BrowserWindow({
    //     height: 400,
    //     width: 400
    // })
    [1,2,3].forEach(_ => {
        
        let win = new BrowserWindow({
            height: 400,
            width: 400
        })

        // mainWindow.loadURL(`file://${__dirname}/index.html`)
        // mainWindow.loadURL('file://' + __dirname + '/index.html');
        // mainWindow.loadURL(url.format({
        //     pathname:path.join(__dirname,'countdown.html'),
        //     protocol:'file:'
        //     }));
        win.loadURL(url.format({
            pathname:path.join(__dirname,'countdown.html'),
            protocol:'file:'
            }));
        
        // mainWindow.on('closed', _ => {
        //     console.log('closed!')
        //     mainWindow = null
        // })
        win.on('closed', _ => {
            console.log('closed!')
            mainWindow = null
        })

        windows.push(win)
    })
})

ipc.on('countdown-start', _ => {
    // console.log('caught it!')
    countdown(count => {
        // webContents is an event emitter instance
        console.log('count', count)
        windows.forEach(win => {
            win.webContents.send('countdown', count)
        })
        // mainWindow.webContents.send('countdown', count)
    })
})