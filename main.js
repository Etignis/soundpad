// Modules to control application life and create native browser window
const {app, BrowserWindow, globalShortcut, ipcMain} = require('electron');
const path = require('path');
let mainWindow;
ipcMain.on('hotkeys', function(oEvent, aKeys) {
	//console.dir(arguments);
	setHotkeys(aKeys);
});
//require('update-electron-app')();
// const { ipcMain } = require('electron');
// ipcMain.on('asynchronous-message', (event, arg) => {
  // console.log(arg) // prints "ping"
  // event.reply('asynchronous-reply', 'pong')
// })

// ipcMain.on('synchronous-message', (event, arg) => {
  // console.log(arg) // prints "ping"
  // event.returnValue = 'pong'
// })
let splash;
function createWindow () {
	splash = new BrowserWindow({
		width: 100, 
		height: 100, 
		transparent: false, 
		backgroundColor: '#333333', 
		frame: false, 
		alwaysOnTop: true});
	splash.loadFile('splash.html');
  // Create the browser window.
  mainWindow = new BrowserWindow({
    width: 100,
    height: 100,
		frame: false,
		show: false, 
		alwaysOnTop: false,
		backgroundColor: '#333333',
	  icon: path.join(__dirname, 'img/64x64.png'),
    webPreferences: {
      //preload: path.join(__dirname, 'preload.js'),
			nodeIntegration: true
    }
  })

  // and load the index.html of the app.
  mainWindow.loadFile('index.html')
	
	//mainWindow.setMenu(null);
	
	mainWindow.once('ready-to-show', () => {
		splash.destroy();
		mainWindow.show()
	})
	
	
  // Open the DevTools.
  // mainWindow.webContents.openDevTools()
}

/**
* aKeys - ["SHIFT" | "CTRL" | "ALT"]
* bActive - true | false
*/
// https://github.com/electron/electron/blob/master/docs/api/global-shortcut.md
function setHotkeys(aKeys){
	let sButton = null;
	let oDict = {
		"SHIFT": 'Shift',
		"CTRL": 'CommandOrControl',
		"ALT": 'Alt',
	};
	aKeys = aKeys.filter(el=>oDict[el]!=undefined).map(el=>oDict[el]);
	
	
	let aNums = [
		'1',
		'2',
		'3',
		'4',
		'5',
		'6',
		'7',
		'8',
		'9',
		'0',
		'num1',
		'num2',
		'num3',
		'num4',
		'num5',
		'num6',
		'num7',
		'num8',
		'num9',
		'num0'
	];
	globalShortcut.unregisterAll();
	//register 
	aNums.forEach((sNum)=>{
		let sHotKey = aKeys.length>0?`${aKeys.join('+')}+${sNum}` : sNum;
		//console.log('set hotkey '+sHotKey);
		const ret = globalShortcut.register(sHotKey, function(){
			//console.log(sNum +' hotKey is pressed');
			let sKey = sNum.includes('num')?sNum.replace('num', "") : sNum; 
			mainWindow.webContents.send('hotkey_press', sKey);
		});
		
		if (!ret) {
			console.log(sHotKey+' registration failed')
		}
	});
}



// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow)

// Quit when all windows are closed.
app.on('window-all-closed', function () {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
	globalShortcut.unregisterAll();
  if (process.platform !== 'darwin') app.quit()
})

app.on('activate', function () {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) createWindow()
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.

