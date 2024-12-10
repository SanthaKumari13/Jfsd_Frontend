import React, { useState, useEffect } from "react";
import { fetchChatMessages, sendMessage } from "../services/api";
import { getSession } from "../utils/cookieUtils";
import './CounselorChat.css'; // Importing the CSS file

const CounselorChat = () => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const counselorId = getSession("counselorId"); // Get logged-in counselor's ID

  // Fetch chat history
  useEffect(() => {
    const fetchConversations = async () => {
      try {
        const response = await fetchChatMessages(counselorId);
        setMessages(response.data); 
      } catch (error) {
        console.error("Error fetching chat messages:", error);
      }
    };

    fetchConversations();
  }, [counselorId]);

  // Send a message
  const handleSendMessage = async () => {
    if (!newMessage.trim()) return;

    const chatMessage = {
      senderId: counselorId,
      receiverId: "STUDENT_ID", // Replace with actual student ID logic
      message: newMessage,
      senderType: "COUNSELOR",
      receiverType: "USER", // Correct this as needed
    };

    try {
      const response = await sendMessage(chatMessage);
      setMessages([...messages, response.data]);
      setNewMessage("");
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  return (
    <div className="chat-container">
      <h2>Counselor Chat</h2>
      <div className="chat-window">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`chat-bubble ${msg.senderType === "COUNSELOR" ? "sender" : "receiver"}`}
          >
            <p>{msg.message}</p>
            <small>
              {new Date(msg.timestamp).toLocaleString()} - {msg.senderType}
            </small>
          </div>
        ))}
      </div>

      <div className="input-container">
        <input
          type="text"
          className="input-field"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Type your message..."
        />
        <button className="send-button" onClick={handleSendMessage}>
          Send
        </button>
      </div>
    </div>
  );
};

export default CounselorChat;
