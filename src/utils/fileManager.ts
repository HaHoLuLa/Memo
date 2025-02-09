import { dialog, type IpcMainEvent } from "electron";
import fs from "fs";
import { getMainWindow } from "./windowManager";

export function openFileDialog(event: IpcMainEvent) {
  const mainWindow = getMainWindow();
  if (!mainWindow) return;

  dialog
    .showOpenDialog(mainWindow, {
      title: "메모 열기",
      filters: [{ name: "Memo", extensions: ["memo"] }],
      properties: ["openFile"],
    })
    .then(({ filePaths }) => {
      if (filePaths.length > 0) {
        const filePath = filePaths[0];

        fs.readFile(filePath, "utf-8", (err, data) => {
          if (err) {
            console.error(err);
            return;
          }
          event.reply("file-opened", data);
          event.reply("file-saved", filePath);
        });
      }
    })
    .catch((err) => console.error(err));
}

export function saveFileDialog(
  event: IpcMainEvent,
  data: string,
  filePath?: string,
  title?: string
) {
  const mainWindow = getMainWindow();
  if (!mainWindow) return;

  if (filePath) {
    fs.writeFile(filePath, data, (err) => {
      if (err) console.error(err);
    });
  } else {
    dialog
      .showSaveDialog(mainWindow, {
        title: "메모 저장",
        defaultPath: `${/[<>:"/\\|?*]/.test(title as string) ? "Memo" : title}.memo`,
        filters: [{ name: "Memo", extensions: ["memo"] }],
      })
      .then(({ filePath }) => {
        if (filePath) {
          fs.writeFile(filePath, data, (err) => {
            if (err) console.error(err);
          });
          event.reply("file-saved", filePath);
        }
      })
      .catch((err) => console.error(err));
  }
}

export function openFile() {
  const mainWindow = getMainWindow();
  const args = process.argv;

  if (!mainWindow) return;

  if (args.length > 1) {
    const filePath = args[args.length - 1];

    fs.readFile(filePath, "utf-8", (err, data) => {
      if (err) {
        console.error(err);
        return;
      }

      mainWindow.webContents.once("did-finish-load", () => {
        mainWindow.webContents.send("file-saved", filePath);
        mainWindow.webContents.send("file-opened", data);
      });
    });
  }
}
