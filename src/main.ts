import { app, BrowserWindow } from "electron";
import { createWindow } from "./utils/windowManager";
import { openFile } from "./utils/fileManager";
import "./utils/ipcHandler";

app.whenReady().then(createWindow).then(openFile);

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});
