/// <reference types="vite/client" />

interface Window {
  electronAPI: {
    sendMessage: (data: string) => void;
    closeWindow: () => void;
    minimalWindow: () => void;
    onMessage: (callback: (data: string) => void) => void;
    maximalWindow: () => void;
    changeTitle: (title: string) => void;
    openDialog: () => void;
    onFileOpened: (callback: (data: string) => void) => void;
    saveDialog: (data: string, filePath?: string) => void;
    getFilePath: (callback: (filePath: string) => void) => void;
  };
}