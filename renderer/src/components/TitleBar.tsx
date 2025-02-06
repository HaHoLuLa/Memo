import { useTitleBar } from "../hooks/useTitleBar";

export default function TitleBar({ title, setTitle }: { title: string, setTitle: (data: string) => void }) {
  const { minimalWindow, maximalWindow, closeWindow, openDialog, saveDialog } = useTitleBar(setTitle);

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
