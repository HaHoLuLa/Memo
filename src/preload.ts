import { contextBridge, ipcRenderer } from 'electron'

contextBridge.exposeInMainWorld('electronAPI', {
  sendMessage: (message: string) => ipcRenderer.send('message', message),
  onMessage: (callback: (data: string) => void) => ipcRenderer.on('message', (event, data) => callback(data)),
  minimalWindow: () => ipcRenderer.send('minimal-window'),
  maximialWindow: () => ipcRenderer.send('maximial-window'),
  closeWindow: () => ipcRenderer.send('close-window'),
});