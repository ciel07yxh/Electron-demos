const electron = require('electron')
const path = require('path')

const {app, Tray, Menu} = electron

app.on('ready', _ => {
    const tray = new Tray(path.join('src', 'trayIcon.png'))
    const contextMenu = Menu.buildFromTemplate([
        {
            label: 'wow',
            click: _ => console.log('wow')
        },
        {
            label: 'awesome',
            click: _ => console.log('awesome')
        }
    ])
    tray.setContextMenu(contextMenu)
    tray.setToolTip('My great app')
})

