import TitleBar from "./components/TitleBar";
import { EditorContent, EditorContext } from "@tiptap/react";
import { useEditorSetup } from "./hooks/useEditorSetup";

function App() {
  const { editor, title, setTitle } = useEditorSetup();

  return (
    <EditorContext.Provider value={{ editor }}>
      <TitleBar title={title} setTitle={setTitle} />
      <div
        style={{
          width: "100%",
          height: "calc(100vh - 30px)",
          paddingTop: "30px",
          overflowY: "auto",
        }}
      >
        <main>
          <EditorContent editor={editor} />
        </main>
      </div>
    </EditorContext.Provider>
  );
}

export default App;
