import pdf_icon from "../assets/pdf-icon.png";
import { useNavigate } from 'react-router-dom';
import React, { useEffect, useState } from "react";


const MainPage = () => {
  const [messages, setMessages] = useState([])
  const [inputText, setInputText] = useState("")
  const [selectedFile, setSelectedFile] = useState(null)
  const [activeFilename, setActiveFilename] = useState(null)

  const navigate = useNavigate()

  function handleInputChange(event) {
    setInputText(event.target.value)
  }

  function handleFileChange(event) {
    setSelectedFile(event.target.files[0])
  }

  async function handleSubmit(event) {
    event.preventDefault()

    let currentFilename = activeFilename

    if (selectedFile) {
      const formData = new FormData()
      formData.append("file", selectedFile)

      const uploadResponse = await fetch("http://localhost:8000/upload", {
        method: "POST",
        body: formData,
      })

      currentFilename = await uploadResponse.json()
      setActiveFilename(currentFilename)
    }

    const promptResponse = await fetch("http://localhost:8000/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: inputText, file: currentFilename }),
    })

    const chatData = await promptResponse.json()

    setMessages(previousMessages => [...previousMessages, { question: inputText, answer: chatData }])
    setInputText("")
  }

  return (
    <div className="main-page">
      <div className="upper-main">
        <button className="download-pdf" onClick={() => navigate("/chat-pdf")}>
          <img className="pdf-icon" src={pdf_icon} alt="pdf-icon" />
        </button>
      </div>
      <div className="side-panel-main">
        <button className="open-panel">
          Open Panel
        </button>
      </div>
      <div className="lower-main">
        <div className="conversation">
          {messages.map((msg, index) => (
            <div key={index} className="message-pair">
              <p className="user-question">{msg.question}</p>
              <p className="bot-answer">{msg.answer}</p>
            </div>
          ))}
        </div>

        <form action="" className="chat-box" onSubmit={handleSubmit}>
          <input
            type="text"
            className="prompt-request"
            value={inputText}
            onChange={handleInputChange}
            placeholder="Ask something about your PDF..."
          />
          <input type="file" accept="application/pdf" onChange={handleFileChange} />
          <button className="submit-btn">Submit</button>
        </form>
      </div>
    </div>
  );
};

export default MainPage;