import { useEditor, EditorContent } from "@tiptap/react"
import StarterKit from "@tiptap/starter-kit"

export default function Editor() {
  const editor = useEditor({
    extensions: [
      StarterKit,
    ],
    content: `
      <h2>
        Hello World!
      </h2>
    `,
  })

  return (
    <EditorContent editor={editor} style={{
      margin: "0.75rem",
    }} />
  )
}