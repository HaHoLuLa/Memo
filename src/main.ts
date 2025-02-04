import { app, BrowserWindow, ipcMain } from 'electron';
import path from 'path';

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

ipcMain.on('maximial-window', () => {
  console.log('Maximial window event received');
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