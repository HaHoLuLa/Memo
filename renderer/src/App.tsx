import TitleBar from "./components/TitleBar";
import { EditorContent, EditorContext } from "@tiptap/react";
import { useEditorSetup } from "./hooks/useEditorSetup";
import { useEffect } from "react";
import { useTitleStore, usePathStore } from "./utils/stores";

export default function App() {
  const { setTitle } = useTitleStore();
  const { editor } = useEditorSetup();
  const { setPath } = usePathStore();

  useEffect(() => {
    window.electronAPI.onFileOpened((data: string) => {
      editor?.commands.setContent(JSON.parse(data));
      const newTitle = editor?.getText().split("\n")[0] || "Memo";
      setTitle(newTitle);
      window.electronAPI.changeTitle(newTitle);
    });

    window.electronAPI.getFilePath((filePath: string) => {
      setPath(filePath);
    });
  }, [editor, setTitle, setPath]);

  return (
    <EditorContext.Provider value={{ editor }}>
      <TitleBar />
      <div className="main-wrapper">
        <main>
          <EditorContent editor={editor} />
        </main>
      </div>
    </EditorContext.Provider>
  );
}