// import { useEffect, useState } from "react";
import TitleBar from "./components/TitleBar";
import Editor from "./components/Editor";

function App() {
  // const [response, setResponse] = useState("");
  // const [data, setData] = useState("");

  // // 버튼 클릭 시 메시지 전송
  // const sendMessage = () => {
  //   window.electronAPI.sendMessage(data);
  // };

  // // 메인 프로세스에서 응답 받기
  // useEffect(() => {
  //   window.electronAPI.onMessage((data) => {
  //     setResponse(data);
  //   });
  // }, []);

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        paddingTop: "30px",
        backgroundColor: "var(--color-background)",
      }}
    >
      <TitleBar />
      <Editor />
    </div>
  );
}

export default App;
