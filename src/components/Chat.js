import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { getSession } from "../utils/cookieUtils";

const Chat = ({ counselorId }) => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const userId = getSession("userId");
  const chatWindowRef = useRef(null);

  // Fetch chat history on load
  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await axios.get(`/api/chat/${userId}/${counselorId}`);
        setMessages(response.data);
        scrollToBottom();
      } catch (error) {
        console.error("Error fetching chat messages:", error);
      }
    };
    fetchMessages();
  }, [userId, counselorId]);

  // Send a message
  const handleSendMessage = async () => {
    if (!newMessage.trim()) return;

    try {
      const response = await axios.post("/api/chat", {
        senderId: userId,
        receiverId: counselorId,
        message: newMessage,
      });

      setMessages((prevMessages) => [...prevMessages, response.data]);
      setNewMessage("");
      scrollToBottom();
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  // Scroll to the latest message
  const scrollToBottom = () => {
    chatWindowRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="chat-container">
      <h2>Chat with Your Counselor</h2>

      <div className="chat-window">
        {messages.length > 0 ? (
          messages.map((msg) => (
            <div
              key={msg.id}
              className={`message ${msg.senderId === userId ? "sent" : "received"}`}
            >
              <p>{msg.message}</p>
              <small>{new Date(msg.timestamp).toLocaleString()}</small>
            </div>
          ))
        ) : (
          <p className="no-messages">No messages yet. Start the conversation!</p>
        )}
        <div ref={chatWindowRef}></div>
      </div>

      <div className="chat-input-container">
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Type your message..."
        />
        <button onClick={handleSendMessage}>Send</button>
      </div>
    </div>
  );
};

export default Chat;
