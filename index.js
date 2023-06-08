// main.js

// Modules to control application life and create native browser window)
//reminder... dont put the FUCKING {BRACKETS} around ES module imports

const { app, BrowserWindow, ipcMain, shell, Menu, screen, dialog} = require('electron');
const path = require('path')
const isMac = process.platform === 'darwin';
const isDev = process.env.NODE_ENV !== 'production';

let mainWindow;

const createWindow = () => {

  const {screen} = require('electron')
  const screenSize = screen.getPrimaryDisplay()
  // Create the browser window.
  mainWindow = new BrowserWindow({
    width: screenSize.workAreaSize.width,
    height: screenSize.workAreaSize.height,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      contextIsolation: true,
      nodeIntegration: true
    }
  })

  // and load the index.html of the app.
  mainWindow.loadFile('index.html')

  // Open the DevTools.
  // mainWindow.webContents.openDevTools()
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  createWindow();
  const mainMenu = Menu.buildFromTemplate(menu);
  Menu.setApplicationMenu(mainMenu);

  // Remove variable from memory
  mainWindow.on('closed', () => (mainWindow = null));
});

 const menu = [
  ...(isMac
    ? [
        {
          label: app.name,
          submenu: [
            {
              label: 'About'
             
            },
          ],
        },
      ]
    : []),
  {
    role: 'fileMenu',
  },
  ...(!isMac
    ? [
        {
          label: 'Help',
          submenu: [
            {
              label: 'About'
              
            },
          ],
        },
      ]
    : []),
  ...(isDev
    ? [
        {
          label: 'Developer',
          submenu: [
            { role: 'reload' },
            { role: 'forcereload' },
            { type: 'separator' },
            { role: 'toggledevtools' },
          ],
        },
      ]
    : []),
]; 

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit()
})

ipcMain.on('excel:process', (e, args)=> {
  console.log("haha ok")
  getScreen()
  
})

function getScreen() {
  
  mainWindow.webContents.send('process:done')
}

  


app.on('window-all-closed', () => {
    app.quit()
})

app.on('activate', () => {
  if(BrowserWindow.getAllWindows().length === 0) createWindow();
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.