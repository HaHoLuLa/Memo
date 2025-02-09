import { BrowserWindow, shell } from "electron";
import path from "path";

let mainWindow: BrowserWindow | null = null;

export function createWindow() {
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    frame: false,
    titleBarStyle: "hidden",
    useContentSize: true,
    minWidth: 300,
    minHeight: 200,
    icon: path.join(__dirname, "../../assets/icon.png"),
    webPreferences: {
      preload: path.join(__dirname, "../preload.js"),
      contextIsolation: true,
      nodeIntegration: false,
      devTools: process.env.NODE_ENV === "development",
    },
  });

  if (process.env.NODE_ENV === "development") {
    mainWindow.loadURL("http://localhost:3000");
  } else {
    mainWindow.loadFile(path.join(__dirname, "../../renderer/dist/index.html"));
  }

  mainWindow.webContents.setWindowOpenHandler(({ url }) => {
    shell.openExternal(url);
    return { action: "deny" };
  })
}

export function getMainWindow() {
  return mainWindow;
}
