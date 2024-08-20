import React, { useState } from "react";
import axios from "axios";
import "./App.css";

const App = () => {
  const [chatOpen, setChatOpen] = useState(false);
  const [userInput, setUserInput] = useState("");
  const [response, setResponse] = useState("");

  const handleToggleChat = () => {
    setChatOpen(!chatOpen);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (userInput.trim() === "") return;

    try {
      const res = await axios.post("http://localhost:8000/ask", {
        question: userInput,
      });
      setResponse(res.data.response);
      setUserInput("");
    } catch (error) {
      setResponse("Error: Could not get response from server.");
      console.error(error);
    }
  };

  return (
    <div className="app-container">
      <div className="chat-icon" onClick={handleToggleChat}>
        💬
      </div>

      {chatOpen && (
        <div className="chat-panel">
          <div className="chat-header">
            <h3>Chat Bot</h3>
            <button onClick={handleToggleChat} className="close-chat">
              ✖
            </button>
          </div>
          <div className="chat-body">
            {response && <div className="chat-response">{response}</div>}
          </div>
          <form onSubmit={handleSubmit} className="chat-input-container">
            <input
              type="text"
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
              placeholder="Ask a question..."
              className="chat-input"
            />
            <button type="submit" className="send-button">
              Send
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default App;