// src/App.tsx
import React, { useState } from "react";
import { Box } from "@mui/material";
import ChatInput from "./components/ChatInput";
import ClearChatButton from "./components/ClearChatButton";
import FeedbackButton from "./components/FeedbackButton";
import SuggestedPrompts from "./components/SuggestedPrompts";
import ChatHistory from "./components/ChatHistory";

interface Reference {
  label: string;
  url: string;
}

interface Message {
  text: string;
  sender: "user" | "ai";
  imageUrl?: string; // Optional image URL for AI messages
  references?: Reference[]; // Optional references
  feedback?: "up" | "down" | null; // Track thumbs up/down for each message
}

const App: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [prompts, setPrompts] = useState<string[]>([
    "Hello",
    "What can you do?",
    "Tell me a joke",
  ]);

  const sendMessage = (message: string) => {
    setMessages([...messages, { text: message, sender: "user" }]);
    // Simulate AI response with references
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          text: "Here is a response with some references:",
          sender: "ai",
          references: [
            { label: "Sample Reference 1", url: "https://www.example.com" },
            { label: "Sample Reference 2", url: "https://www.example.org" },
          ],
          feedback: null, // No feedback initially
        },
      ]);
    }, 1000);
  };

  const clearChat = () => {
    setMessages([]);
  };

  const handleFeedback = (index: number, feedback: "up" | "down" | null) => {
    setMessages((prev) =>
      prev.map((msg, i) => (i === index ? { ...msg, feedback } : msg))
    ); // Update the feedback for the specific message
  };

  const handlePromptSelect = (prompt: string) => {
    sendMessage(prompt);
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100vh" }}>
      <ChatHistory messages={messages} onFeedback={handleFeedback} />
      <SuggestedPrompts prompts={prompts} onSelect={handlePromptSelect} />
      <Box
        sx={{
          position: "fixed",
          bottom: 0,
          width: "100%",
          display: "flex",
          alignItems: "center",
          padding: "10px",
          backgroundColor: "#fff",
          boxShadow: "0 -2px 5px rgba(0,0,0,0.1)",
        }}
      >
        <ClearChatButton onClear={clearChat} />
        <Box sx={{ flexGrow: 1, marginLeft: "10px", marginRight: "10px" }}>
          <ChatInput onSend={sendMessage} />
        </Box>
        <FeedbackButton />
      </Box>
    </div>
  );
};

export default App;
