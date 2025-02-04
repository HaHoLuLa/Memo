export default function TitleBar() {
  const minimalWindow = () => {
    console.log("Minimal window event sent");
    window.electronAPI.minimalWindow();
  };

  const maximialWindow = () => {
    console.log("Maximial window event sent");
    window.electronAPI.maximialWindow();
  }

  const closeWindow = () => {
    console.log("Close window event sent");
    window.electronAPI.closeWindow();
  };

  return (
    <div
      style={{
        width: "100vw",
        height: "30px",
        backgroundColor: "var(--color-primary)",
        display: "flex",
        justifyContent: "flex-end",
        alignItems: "center",
        position: "fixed",
        top: 0,
        zIndex: 9999,
      }}
      className="title-bar"
    >
      {/* <p style={{ marginLeft: "0.75rem" }}>Memo</p> */}
      <div style={{ display: "flex", height: "100%" }}>
        <button
          onClick={minimalWindow}
          className="title-bar-button"
        >
          _
        </button>
        <button
          onClick={maximialWindow}
          className="title-bar-button"
        >
          ㅁ
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