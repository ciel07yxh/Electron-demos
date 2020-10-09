const electron = require('electron')
const fs = require('fs')
const path = require('path')

const { desktopCapturer, ipcRenderer: ipc, screen } = electron

function getMainSource(desktopCapturer, screen, done) {
    // there are many things that can be captured, screens, audio, video etc.
    const options = { types: ['screen'], thumbnailSize: screen.getPrimaryDisplay().workAreaSize }
    desktopCapturer.getSources(options, (err, sources) => {
        if (err) return console.log('Cannot capture screen:', err)
        const isMainSource = source => source.name === 'Entire Screen' || source.name === 'Screen 1'
        done(sources.filter(isMainSource)[0])
    })
}


function onCapture(evt, targetPath) {
    console.log('capture!')
    getMainSource(desktopCapturer, screen, source => {
        // ?? source is undifined
        const png = source.thumbnail.toPNG()
        const filePath = path.join(targetPath, new Date() + '.png')
        writeScreenshot(png, filePath)
    })
}

function writeScreenshot(png, filePath) {
    fs.writeFile(filePath, png, err => {
        if (err) return console.log('Failed to write screen:', err)

    })
}

ipc.on('capture', onCapture)