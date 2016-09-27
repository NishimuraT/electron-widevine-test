'use strict';

const electron = require('electron');
const path = require('path');
// Module to control application life.
const app = electron.app;
// Module to create native browser window.
const BrowserWindow = electron.BrowserWindow;

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow;

app.commandLine.appendSwitch('widevine-cdm-path', path.join(__dirname, `./widevine/1.4.8.866/_platform_specific/mac_x64/widevinecdmadapter.plugin`));
// // The version of plugin can be got from `chrome://plugins` page in Chrome.
app.commandLine.appendSwitch('widevine-cdm-version', '1.4.8.866');

function createWindow () {
  // Create the browser window.
  mainWindow = new BrowserWindow({
    webPreferences: {
      // The `plugins` have to be enabled.
      plugins: true
    }
  });

  // and load the index.html of the app.
  mainWindow.loadURL('file://' + __dirname + '/index.html');
  // mainWindow.loadURL(`http://192.168.33.10/sample01.html`);
  // mainWindow.loadURL(`http://54.248.249.96/ulizahtml5/1.1/scenario2/testpage.php?testid=scenario_test_0004`);

  // Open the DevTools.
  mainWindow.webContents.openDevTools();

  // Emitted when the window is closed.
  mainWindow.on('closed', function() {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null;
  });
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
app.on('ready', createWindow);

// Quit when all windows are closed.
app.on('window-all-closed', function () {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', function () {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) {
    createWindow();
  }
});