// src/App.tsx
import React, { useState } from "react";
import { Box } from "@mui/material";
import ChatInput from "./components/ChatInput";
import FeedbackButton from "./components/FeedbackButton";
import SuggestedPrompts from "./components/SuggestedPrompts";
import ChatHistory from "./components/ChatHistory";
import NewTopicButton from "./components/NewTopicButton";

interface Message {
  text: string;
  sender: "user" | "ai";
  imageUrl?: string;
  references?: { title: string; url?: string }[];
  feedback?: "up" | "down" | null;
}

const App: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [prompts] = useState<string[]>([
    "Hello! It's going well, thanks. How about yours?",
    "Hi! Not too bad. What about you?",
    "Hey! I'm doing great today.",
  ]);

  const sendMessage = (message: string) => {
    setMessages([...messages, { text: message, sender: "user" }]);
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        { text: "Here is a sample AI response.", sender: "ai", feedback: null },
      ]);
    }, 1000);
  };

  // Handle feedback (thumbs up/down)
  const handleFeedback = (index: number, feedback: "up" | "down" | null) => {
    const updatedMessages = messages.map((msg, i) =>
      i === index ? { ...msg, feedback } : msg
    );
    setMessages(updatedMessages);
  };

  const handlePromptSelect = (prompt: string) => {
    sendMessage(prompt);
  };

  const handleNewTopic = () => {
    setMessages([]); // Clear all current messages
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        height: "100vh",
        overflow: "hidden",
        width: "100%",
      }}
    >
      <ChatHistory messages={messages} onFeedback={handleFeedback} />

      {/* Suggested Prompts */}
      <Box
        sx={{
          position: "absolute",
          bottom: "100px",
          width: "100%",
          overflowX: "auto",
          padding: "10px",
          display: "flex",
          justifyContent: "center",
          gap: "10px",
          whiteSpace: "nowrap",
        }}
      >
        <SuggestedPrompts prompts={prompts} onSelect={handlePromptSelect} />
      </Box>

      {/* Chat Input Area */}
      <Box
        sx={{
          position: "fixed",
          bottom: 0,
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "10px",
          backgroundColor: "#fff",
          overflow: "hidden",
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: "100%",
            maxWidth: "900px",
            gap: "5px",
            padding: "0 10px",
          }}
        >
          <Box sx={{ flexShrink: 0, marginRight: "10px" }}>
            <NewTopicButton onNewTopic={handleNewTopic} />
          </Box>

          {/* Centered Chat Input */}
          <Box sx={{ flexGrow: 1, minWidth: "100px", maxWidth: "600px" }}>
            <ChatInput onSend={sendMessage} />
          </Box>

          {/* Feedback Button */}
          <Box sx={{ flexShrink: 0 }}>
            <FeedbackButton />
          </Box>
        </Box>
      </Box>
    </div>
  );
};

export default App;
