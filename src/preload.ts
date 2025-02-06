import { contextBridge, ipcRenderer } from 'electron'

contextBridge.exposeInMainWorld('electronAPI', {
  minimalWindow: () => ipcRenderer.send('minimal-window'),
  maximalWindow: () => ipcRenderer.send('maximal-window'),
  closeWindow: () => ipcRenderer.send('close-window'),
  changeTitle: (title: string) => ipcRenderer.send('change-title', title),
  openDialog: () => ipcRenderer.send('open-dialog'),
  onFileOpened: (callback: (data: string) => void) => ipcRenderer.on('file-opened', (event, data) => callback(data)),
  saveDialog: (data: string, filePath?: string) => ipcRenderer.send('save-dialog', data, filePath),
  getFilePath: (callback: (filePath: string) => void) => ipcRenderer.on('file-saved', (event, filePath) => callback(filePath)),
});