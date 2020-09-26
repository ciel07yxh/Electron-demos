const electron = require('electron')
const path = require('path')

const {app, Tray, Menu, clipboard, globalShortcut} = electron
const STACK_SIZE =5 
const ITEM_MAX_LENGTH = 20

function addToStack(item, stack) {
    return [item].concat(stack.length >= STACK_SIZE ? stack.slice(0, stack.length -1) : stack)
}

function formatItem(item) {
    return item && item.length > ITEM_MAX_LENGTH
     ? item.substr(0, ITEM_MAX_LENGTH) + '...'
      : item
}

function formatMenuTemplateForStack(stack) {
    return stack.map((item, i) => {
        return {
            label: `Cpy: ${formatItem(item)}`,
            click: _ => clipboard.writeText(item),
            // ?
            accelerator: `Ctrl+Alt+${i+1}`
        }
        
    })
}

function checkClipboardForChange(clipboard, onchange) {
    let cache = clipboard.readText()
    let latest
    setInterval(_ => {
        latest = clipboard.readText()
        if (latest !== cache) {
            cache = latest
            onchange(cache)
        }
    }, 1000)
}


function registerShortcuts(globalShortcut, clipboard, stack) {
    globalShortcut.unregisterAll()
    for (let i = 0; i < STACK_SIZE; ++i) {
        globalShortcut.register(`Ctrl+Alt+${i+1}`, _ => {
            clipboard.writeText(stack[i])
        })
    }
}

app.on('ready', _ => {
    let stack = []
    const tray = new Tray(path.join('src', 'trayIcon.png'))
    tray.setContextMenu(Menu.buildFromTemplate([{ label: '<Empty>', enable: false}]))

    checkClipboardForChange(clipboard, text => {
        stack = addToStack(text, stack)
        // console.log("stack", stack)
        tray.setContextMenu(Menu.buildFromTemplate(formatMenuTemplateForStack(stack)))
        registerShortcuts(globalShortcut, clipboard, stack)
    })
})


app.on('will-quit', _ => {
    globalShortcut.unregisterAll()
})