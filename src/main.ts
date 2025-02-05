import { app, BrowserWindow, ipcMain, dialog } from 'electron';
import path from 'path';
import fs from 'fs';

let mainWindow: BrowserWindow | null = null;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    // resizable: false,
    frame: false,
    titleBarStyle: 'hidden',
    useContentSize: true,
    minWidth: 300,
    minHeight: 200,
    icon: path.join(__dirname, '../assets/icon-512.png'),
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      contextIsolation: true,
      nodeIntegration: false,
      devTools: true,
    },
  });

  if (process.env.NODE_ENV === 'development') {
    console.log('개발');
    mainWindow.loadURL('http://localhost:3000');
  } else {
    console.log('배포');
    mainWindow.loadFile(path.join(__dirname, '../renderer/dist/index.html'));
  }
}

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

ipcMain.on('message', (event, message) => {
  console.log('Received message from Renderer:', message);
  event.reply('message', `Hello from Main Process! You sent: ${message}`);
});

ipcMain.on('minimal-window', () => {
  console.log('Minimal window event received');
  // mainWindow.blur();
  if (mainWindow)
    mainWindow.minimize();
});

ipcMain.on('maximal-window', () => {
  console.log('Maximal window event received');
  if (mainWindow)
    if (mainWindow.isMaximized())
      mainWindow.unmaximize();
    else
      mainWindow.maximize();
});

ipcMain.on('close-window', () => {
  console.log('Close window event received');
  app.quit();
});

ipcMain.on('change-title', (event, title) => {
  console.log('Change title event received');
  if (mainWindow)
    mainWindow.setTitle(title);
});

ipcMain.on('open-dialog', (event) => {
  console.log('Open dialog event received');
  if (mainWindow)
    dialog.showOpenDialog(mainWindow, {
      title: '메모 열기',
      filters: [{ name: 'Json', extensions: ['json'] }],
      properties: ['openFile'],
    }).then(({ filePaths }) => {
      if (filePaths.length > 0) {
        const filePath = filePaths[0];
        console.log('File path:', filePath);
        
        fs.readFile(filePath, 'utf-8', (err, data) => {
          if (err) {
            console.error(err);
            return;
          }
          console.log('File data:', data);
          event.reply('file-opened', data);
        });
      }
    })
});

ipcMain.on('save-dialog', (event, data) => {
  console.log('Save dialog event received');
  if (mainWindow)
    dialog.showSaveDialog(mainWindow, {
      title: '메모 저장',
      defaultPath: 'memo.json',
      filters: [{ name: 'Json', extensions: ['json'] }],
    }).then(({ filePath }) => {
      if (filePath) {
        console.log('File path:', filePath);
        fs.writeFile(filePath, data, (err) => {
          if (err) {
            console.error(err);
            return;
          }
          console.log('File saved');
        });
      }
    }).catch((err) => console.error(err));
})