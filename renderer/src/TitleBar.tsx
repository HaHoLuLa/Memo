import { useCurrentEditor } from "@tiptap/react";
import { useEffect } from "react";

export default function TitleBar({ title, setTitle }: { title: string, setTitle: (data: string) => void }) {
  const { editor } = useCurrentEditor();

  const minimalWindow = () => {
    console.log("Minimal window event sent");
    window.electronAPI.minimalWindow();
  };

  const maximalWindow = () => {
    console.log("Maximial window event sent");
    window.electronAPI.maximalWindow();
  }

  const closeWindow = () => {
    console.log("Close window event sent");
    window.electronAPI.closeWindow();
  };

  const openDialog = () => {
    console.log("Open dialog event sent");
    window.electronAPI.openDialog();
    window.electronAPI.onFileOpened((data) => {
      editor?.commands.setContent(JSON.parse(data))
      setTitle(editor?.getText().split("\n")[0] || "Memo")
      window.electronAPI.changeTitle(editor?.getText().split("\n")[0] || "Memo")
    });
  }

  const saveDialog = () => {
    console.log("Save dialog event sent");
    window.electronAPI.saveDialog(JSON.stringify(editor?.getJSON()));
  }

  useEffect(() => {
    console.log("Editor:")
    console.log(editor)
  }, [editor])

  return (
    <div
      style={{
        width: "100vw",
        height: "30px",
        backgroundColor: "var(--color-primary)",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        position: "fixed",
        top: 0,
        zIndex: 9999,
      }}
      className="title-bar"
    >
      <p style={{
        marginLeft: "0.75rem",
        overflow: "hidden",
        textOverflow: "ellipsis",
        whiteSpace: "nowrap",
        maxWidth: "30%",
      }}>
        {title}
      </p>
      <div style={{ display: "flex", height: "100%" }}>
        <button
          onClick={saveDialog}
          className="title-bar-button"
          title="메모 저장"
        >
          <span className="material-symbols-outlined">
            save
          </span>
        </button>
        <button
          onClick={openDialog}
          className="title-bar-button"
          title="메모 열기"
        >
          <span className="material-symbols-outlined">
            file_open
          </span>
        </button>
        <button
          onClick={minimalWindow}
          className="title-bar-button"
          title="최소화"
        >
          <span className="material-symbols-outlined">
            minimize
          </span>
        </button>
        <button
          onClick={maximalWindow}
          className="title-bar-button"
          title="최대화"
        >
          <span className="material-symbols-outlined">
            fullscreen
          </span>
        </button>
        <button
          onClick={closeWindow}
          className="close-button title-bar-button"
          title="닫기"
        >
          <span className="material-symbols-outlined">
            close
          </span>
        </button>
      </div>
    </div>
  )
}