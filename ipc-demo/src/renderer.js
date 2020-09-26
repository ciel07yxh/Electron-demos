// console.log("In renderer!");

const electron = require('electron')
const ipc = electron.ipcRenderer

document.getElementById('start').addEventListener('click', _ =>{
    // console.log('start clicked!')
    ipc.send('countdown-start')
})

ipc.on('countdown', (event, count) => {
    console.log("render count", count)
    document.getElementById('count').innerHTML = count
})

// ipc.on("countdown", function (event, data) {
//     console.log("received data", data)
//     alert("received data")
// });