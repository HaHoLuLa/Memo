import TitleBar from "./components/TitleBar";
import { EditorContent, EditorContext } from "@tiptap/react";
import { useEditorSetup } from "./hooks/useEditorSetup";

export default function App() {
  const { editor, title, setTitle } = useEditorSetup();

  return (
    <EditorContext.Provider value={{ editor }}>
      <TitleBar title={title} setTitle={setTitle} />
      <div className="main-wrapper">
        <main>
          <EditorContent editor={editor} />
        </main>
      </div>
    </EditorContext.Provider>
  );
}