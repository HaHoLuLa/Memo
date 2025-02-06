import { dialog, type IpcMainEvent } from 'electron';
import fs from 'fs';
import { getMainWindow } from "./windowManager";

export function openFileDialog(event: IpcMainEvent) {
  const mainWindow = getMainWindow();
  if (!mainWindow) return;

  dialog.showOpenDialog(mainWindow, {
    title: '메모 열기',
    filters: [{ name: 'Memo', extensions: ['json'] }],
    properties: ['openFile'],
  }).then(({ filePaths }) => {
    if (filePaths.length > 0) {
      const filePath = filePaths[0];

      fs.readFile(filePath, 'utf-8', (err, data) => {
        if (err) {
          console.error(err);
          return;
        }
        event.reply('file-opened', data);
        event.reply('file-saved', filePath);
      });
    }
  }).catch((err) => console.error(err));
}

export function saveFileDialog(event: IpcMainEvent, data: string, filePath?: string) {
  const mainWindow = getMainWindow();
  if (!mainWindow) return;

  if (filePath) {
    fs.writeFile(filePath, data, (err) => {
      if (err) console.error(err);
    });
  } else {
    dialog.showSaveDialog(mainWindow, {
      title: '메모 저장',
      defaultPath: 'memo.json',
      filters: [{ name: 'Memo', extensions: ['json'] }],
    }).then(({ filePath }) => {
      if (filePath) {
        fs.writeFile(filePath, data, (err) => {
          if (err) console.error(err);
        });
        event.reply('file-saved', filePath);
      }
    }).catch((err) => console.error(err));
  }
}
