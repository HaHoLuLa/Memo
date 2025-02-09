import { Editor, useCurrentEditor } from "@tiptap/react";
import { electronAPI } from "../utils/electronAPI";
import { useTitleStore, usePathStore } from "../utils/stores";

export function useTitleBar() {
  const { editor } = useCurrentEditor();
  const { path, setPath } = usePathStore();
  const { title, setTitle } = useTitleStore();

  return {
    editor,
    minimalWindow: electronAPI.minimalWindow,
    maximalWindow: electronAPI.maximalWindow,
    closeWindow: electronAPI.closeWindow,
    openDialog: () => electronAPI.openDialog(editor as Editor, setTitle, setPath),
    saveDialog: () => electronAPI.saveDialog(editor as Editor, path, setPath, title),
  };
}
