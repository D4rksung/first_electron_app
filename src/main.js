const electron = require('electron')
const countdown = require('./countdown')

const app = electron.app
const ipc = electron.ipcMain
const {
  BrowserWindow,
} = electron

const windows = []
app.on('ready', () => {
	[1, 2, 3].forEach(i => {
		let params = {
			height: 400,
			width: 400
		}
		switch (i) {
		case 1:
			params.frame = false
			break
		case 2:
			params.titleBarStyle = 'hidden'
			break
		default:
			params.titleBarStyle = 'hidden-inset'
		}
		let win = new BrowserWindow(params)

		win.loadURL(`file://${__dirname}/countdown.html`)

		win.on('closed', () => {
			win = null
		})

		windows.push(win)
	})
})

ipc.on('countdown-start', () => {
	windows.forEach(win => {
		countdown(count => {
			win.webContents.send('countdown', count)
		})
	})
})
