import React from "react";
import "./App.css";

function App() {
  const [inputData, setinputData] = React.useState("Hello world");
  const [receivedData, setreceivedData] = React.useState(null);
  const url = "https://morse-prolog.onrender.com/";

  const handleInputChange = (e) => {
    setinputData(e.target.value);
  };

  const sendToServerFromMorse = () => {
    console.log(inputData.split(","));
    fetch(url + "apiFromMorse", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ sentence: inputData.split(",") }),
    })
      .then((res) => res.json())
      .then((data) => setreceivedData(data.result));
  };

  const sendToServerToMorse = () => {
    fetch(url + "apiToMorse", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ sentence: inputData }),
    })
      .then((res) => res.json())
      .then((data) => setreceivedData(data.result));
  };

  React.useEffect(() => {
    fetch(url + "hello")
      .then((res) => res.json())
      .then((data) => setreceivedData(data.message));
  }, []);

  return (
    <div className="App">
      <p className="titl">Node and React Prolog Morse code transliterator</p>
      <div className="translator">
        <input
          type="text"
          placeholder="Enter a sentence to translate morse"
          value={inputData}
          onChange={handleInputChange}
        />
        <div className="buttons">
          <button
            onClick={sendToServerFromMorse}
          > Morse to Text</button>
          <button
            onClick={sendToServerToMorse}
          >Text to Morse</button>
        </div>
        <p className="res">{!receivedData ? "Loading..." : receivedData}</p>
      </div>
    </div>
  );
}

export default App;