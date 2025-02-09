import { ipcMain, app } from 'electron';
import { getMainWindow } from './windowManager';
import { openFileDialog, saveFileDialog } from './fileManager';

ipcMain.on('minimal-window', () => {
  const mainWindow = getMainWindow();
  if (mainWindow) mainWindow.minimize();
});

ipcMain.on('maximal-window', () => {
  const mainWindow = getMainWindow();
  if (mainWindow) {
    if (mainWindow.isMaximized()) mainWindow.unmaximize();
    else mainWindow.maximize();
  }
});

ipcMain.on('close-window', () => {
  app.quit();
});

ipcMain.on('change-title', (event, title) => {
  const mainWindow = getMainWindow();
  if (mainWindow) mainWindow.setTitle(title);
});

ipcMain.on('open-dialog', (event) => openFileDialog(event));
ipcMain.on('save-dialog', (event, data, filePath, title) => saveFileDialog(event, data, filePath, title));
