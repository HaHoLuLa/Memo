import { useEffect, useState } from "react";
import { useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";

export function useEditorSetup() {
  const [title, setTitle] = useState("Memo");

  const editor = useEditor({
    extensions: [StarterKit],
    content: `<h2>Hello World!</h2>`,
    onUpdate({ editor }) {
      const newTitle = editor.getText().split("\n")[0] || "Memo";
      window.electronAPI.changeTitle(newTitle);
      setTitle(newTitle);
      console.log(editor.getJSON());
    }
  });

  useEffect(() => {
    if (editor) {
      const newTitle = editor.getText().split("\n")[0] || "Memo";
      window.electronAPI.changeTitle(newTitle);
      setTitle(newTitle);
    }
  }, [editor]);

  return { editor, title, setTitle };
}
