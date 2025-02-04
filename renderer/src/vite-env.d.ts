/// <reference types="vite/client" />

interface Window {
  electronAPI: {
    sendMessage: (data: string) => void;
    closeWindow: () => void;
    minimalWindow: () => void;
    onMessage: (callback: (data: string) => void) => void;
    maximialWindow: () => void;
  };
}