import { contextBridge, ipcRenderer } from 'electron'

contextBridge.exposeInMainWorld('electronAPI', {
  sendMessage: (message: string) => ipcRenderer.send('message', message),
  onMessage: (callback: (data: string) => void) => ipcRenderer.on('message', (event, data) => callback(data)),
  minimalWindow: () => ipcRenderer.send('minimal-window'),
  maximalWindow: () => ipcRenderer.send('maximal-window'),
  closeWindow: () => ipcRenderer.send('close-window'),
  changeTitle: (title: string) => ipcRenderer.send('change-title', title),
  openDialog: () => ipcRenderer.send('open-dialog'),
  onFileOpened: (callback: (data: string) => void) => ipcRenderer.on('file-opened', (event, data) => callback(data)),
  saveDialog: (data: string) => ipcRenderer.send('save-dialog', data),
});