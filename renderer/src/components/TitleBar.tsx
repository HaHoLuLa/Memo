export default function TitleBar() {
  const closeWindow = () => {
    console.log("Close window event sent");
    window.electronAPI.closeWindow();
  };

  const minimalWindow = () => {
    console.log("Minimal window event sent");
    window.electronAPI.minimalWindow();
  };

  return (
    <div
      style={{
        width: "100%",
        height: "30px",
        // borderRadius: "5px 5px 0 0",
        backgroundColor: "var(--color-primary)",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        position: "fixed",
        top: 0,
        zIndex: 100,
      }}
      className="title-bar"
    >
      <p style={{ marginLeft: "0.75rem" }}>Memo</p>
      <div style={{ display: "flex", height: "100%" }}>
        <button
          onClick={minimalWindow}
          className="title-bar-button"
        >
          _
        </button>
        <button
          onClick={closeWindow}
          className="close-button title-bar-button"
        >
          X
        </button>
      </div>
    </div>
  )
}