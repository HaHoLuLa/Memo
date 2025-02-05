import TitleBar from "./TitleBar";
// import Editor from "./components/Editor";
import { useEffect, useState } from "react";
import { EditorContent, EditorContext, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";

function App() {
  const [title, setTitle] = useState("Memo");
  const editor = useEditor({
    extensions: [
      StarterKit,
    ],
    content: `
        <h2>
          Hello World!
        </h2>
      `,
    onUpdate({ editor }) {
      window.electronAPI.changeTitle(editor.getText().split("\n")[0] || "Memo")
      setTitle(editor.getText().split("\n")[0] || "Memo")
      console.log(editor.getJSON())
    }
  })

  useEffect(() => {
    setTitle(editor?.getText().split("\n")[0] || "Memo")
    window.electronAPI.changeTitle(editor?.getText().split("\n")[0] || "Memo")
  }, [editor])

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
          {/* <Editor setTitle={setTitle} /> */}
          <EditorContent editor={editor} />
        </main>
      </div>
    </EditorContext.Provider>
  );
}

export default App;
