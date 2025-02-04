import TitleBar from "./components/TitleBar";
import Editor from "./components/Editor";

function App() {
  return (
    <>
      <TitleBar />
      <div
        style={{
          width: "100%",
          height: "calc(100vh - 30px)",
          paddingTop: "30px",
          overflowY: "auto",
        }}
      >
        <main>
          <Editor />
        </main>
      </div>
    </>
  );
}

export default App;
