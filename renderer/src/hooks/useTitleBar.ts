import { Editor, useCurrentEditor } from "@tiptap/react";
import { useState } from "react";
import { electronAPI } from "../utils/electronAPI";

export function useTitleBar(setTitle: (title: string) => void) {
  const { editor } = useCurrentEditor();
  const [path, setPath] = useState<string | null>(null);

  return {
    editor,
    path,
    setPath,
    minimalWindow: electronAPI.minimalWindow,
    maximalWindow: electronAPI.maximalWindow,
    closeWindow: electronAPI.closeWindow,
    openDialog: () => electronAPI.openDialog(editor as Editor, setTitle, setPath),
    saveDialog: () => electronAPI.saveDialog(editor as Editor, path, setPath),
  };
}
