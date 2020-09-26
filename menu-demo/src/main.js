const electron = require('electron')

const app = electron.app
const BrowserWindow = electron.BrowserWindow
const Menu = electron.Menu


app.on('ready', _ => {
    new BrowserWindow()

    const name = electron.app.getName()
    console.log(name)
    const template = [
        {
            label: name,
            submenu: [{
                role: 'about',
                // label: `About ${name}`,
                click: _ => {
                    console.log('clicked')
                },
                // ?
                
            }]
        },
        {
            label: 'Edit',
            submenu: [
               {
                  role: 'undo',
               },
               {
                  type: 'separator',
               }, 
               {
                  label: 'Quite',
                  click: _ => { app.quit() },
                  // ?
                  accelerator: 'Ctrl+Q'
               }
            ]
         },
    ]

    const menu = Menu.buildFromTemplate(template)
    Menu.setApplicationMenu(menu)
})