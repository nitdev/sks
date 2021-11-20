const { app, BrowserWindow, autoUpdater, dialog } = require('electron');
const path = require('path');
const shell = require('electron').shell;

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require('electron-squirrel-startup')) { // eslint-disable-line global-require
  app.quit();
}

require('update-electron-app')({
  repo: 'nitdev/sks',
  updateInterval: '5 minutes',
})


const createWindow = () => {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 1200,
    height: 700,
  });

  // and load the index.html of the app.
  // mainWindow.loadFile(path.join(__dirname, 'index.html'));
  // mainWindow.loadURL('https://saoke.live/');
  mainWindow.loadURL('https://www.facebook.com/');
  mainWindow.webContents.on('new-window', function (e, url) {
    e.preventDefault();
    shell.openExternal(url);
  });

  // Open the DevTools.
  mainWindow.webContents.openDevTools();


  // check update
  // const server = 'https://github.com/nitdev/sks'
  // const url = `${server}/update/${process.platform}/${app.getVersion()}`
  // console.log("url", url);
  // autoUpdater.setFeedURL({ url });

  // autoUpdater.on('update-available', (event) => {
  //   console.log('có bản cập nhật')
  // });

  // autoUpdater.on('update-downloaded', (event, releaseNotes, releaseName) => {
  //   const dialogOpts = {
  //     type: 'info',
  //     buttons: ['Mở lại Saoke.Live', 'Để sau'],
  //     title: 'Cập nhật SaoKe.Live',
  //     message: process.platform === 'win32' ? releaseNotes : releaseName,
  //     detail: 'SaoKe.Live đã có bản cập nhật. Vui lòng cập nhật bản mới để tiếp tục xem bóng đá Full HD hấp dẫn'
  //   }

  //   dialog.showMessageBox(dialogOpts).then((returnValue) => {
  //     if (returnValue.response === 0) autoUpdater.quitAndInstall()
  //   })
  // });

  // autoUpdater.on('error', message => {
  //   console.error('Có lỗi cập nhật', message)
  // })

  // setInterval(() => {
  //   console.log("vao interval");
  //   autoUpdater.checkForUpdates()
  // }, 60000)
};

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow);

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and import them here.
