import { Editor } from "@tiptap/react";

export const electronAPI = {
  minimalWindow: () => {
    console.log("Minimal window event sent");
    window.electronAPI.minimalWindow();
  },
  maximalWindow: () => {
    console.log("Maximal window event sent");
    window.electronAPI.maximalWindow();
  },
  closeWindow: () => {
    console.log("Close window event sent");
    window.electronAPI.closeWindow();
  },
  openDialog: (editor: Editor, setTitle: (title: string) => void, setPath: (path: string | null) => void) => {
    console.log("Open dialog event sent");
    window.electronAPI.openDialog();
    
    window.electronAPI.onFileOpened((data: string) => {
      editor?.commands.setContent(JSON.parse(data));
      const newTitle = editor?.getText().split("\n")[0] || "Memo";
      setTitle(newTitle);
      window.electronAPI.changeTitle(newTitle);
    });

    window.electronAPI.getFilePath((filePath: string) => {
      setPath(filePath);
    });
  },
  saveDialog: (editor: Editor, path: string | null, setPath: (path: string | null) => void, title?: string) => {
    console.log("Save dialog event sent");
    const data = JSON.stringify(editor?.getJSON());

    if (path) {
      window.electronAPI.saveDialog(data, path);
    } else {
      window.electronAPI.saveDialog(data, undefined, title);
      window.electronAPI.getFilePath((filePath: string) => {
        setPath(filePath);
      });
    }
  }
};
