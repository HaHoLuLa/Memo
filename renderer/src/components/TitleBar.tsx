import { useEffect } from "react";
import { useTitleBar } from "../hooks/useTitleBar";

export default function TitleBar({ title, setTitle }: { title: string, setTitle: (data: string) => void }) {
  const { minimalWindow, maximalWindow, closeWindow, openDialog, saveDialog } = useTitleBar(setTitle);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if ((event.ctrlKey || event.metaKey) && event.key === "s") {
        event.preventDefault();
        saveDialog()
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [saveDialog]);

  return (
    <div className="title-bar">
      <p>{title}</p>
      <div>
        <TitleBarButton onClick={saveDialog} title="메모 저장" icon="save" />
        <TitleBarButton onClick={openDialog} title="메모 열기" icon="file_open" />
        <TitleBarButton onClick={minimalWindow} title="최소화" icon="minimize" />
        <TitleBarButton onClick={maximalWindow} title="최대화" icon="fullscreen" />
        <TitleBarButton onClick={closeWindow} title="닫기" icon="close" className="close-button" />
      </div>
    </div>
  );
}

function TitleBarButton({ onClick, title, icon, className = "" }: { onClick: () => void; title: string; icon: string; className?: string }) {
  return (
    <button onClick={onClick} className={`title-bar-button ${className}`} title={title}>
      <span className="material-symbols-outlined">{icon}</span>
    </button>
  );
}
