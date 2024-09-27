import React, { useState } from "react";
import { Box } from "@mui/material";
import axios from "axios"; // Import axios for API calls
import ChatInput from "./components/ChatInput";
import FeedbackButton from "./components/FeedbackButton";
import SuggestedPrompts from "./components/SuggestedPrompts";
import ChatHistory from "./components/ChatHistory";
import NewTopicButton from "./components/NewTopicButton";

interface Reference {
  title: string;
  documentUrl: string;
}

interface ImageData {
  url: string;
  source: string;
}

interface Message {
  text: string;
  sender: "user" | "ai";
  imageList?: ImageData[];
  references?: Reference[];
  feedback?: "up" | "down" | null;
}

const App: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [prompts] = useState<string[]>([
    "Hello! It's going well, thanks. How about yours?",
    "Hi! Not too bad. What about you?",
    "Hey! I'm doing great today.",
  ]);

  // Function to send a message to the backend
  const sendMessage = async (message: string) => {
    // Add user's message to chat history
    const newMessage: Message = { text: message, sender: "user" };
    setMessages([...messages, newMessage]);

    // Create the payload for the backend with message and history
    const payload = {
      message,
      history: messages,
    };

    try {
      // Make a POST request to the FastAPI backend
      const response = await axios.post("http://localhost:8000/chat", payload);

      // Assume the response structure from FastAPI is similar to the `Message` interface
      const aiResponse: Message = {
        text: response.data.text,
        sender: "ai",
        imageList: response.data.imageList,
        references: response.data.references,
        feedback: null,
      };

      // Update the chat history with the AI response
      setMessages((prev) => [...prev, aiResponse]);
    } catch (error) {
      console.error("Failed to send message to the backend", error);
    }
  };

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
    setMessages([]);
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        height: "100vh",
        overflow: "hidden",
        padding: 0,
        width: "100%",
        backgroundColor: "#f5f5f5",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          width: "100%",
          maxWidth: "1200px",
          margin: 0,
          padding: 0,
        }}
      >
        <Box
          sx={{
            flexGrow: 1,
            display: "flex",
            flexDirection: "column",
            boxSizing: "border-box",
            padding: "20px",
            paddingBottom: "200px",
          }}
        >
          <Box
            sx={{
              flexGrow: 1,
              overflowY: "scroll",
              maxHeight: "calc(100vh - 300px)",
              "&::-webkit-scrollbar": { display: "none" },
              "-ms-overflow-style": "none",
              scrollbarWidth: "none",
            }}
          >
            <ChatHistory messages={messages} onFeedback={handleFeedback} />
          </Box>

          <Box
            sx={{
              width: "100%",
              padding: "10px 0",
              display: "flex",
              justifyContent: "center",
              gap: "10px",
              flexWrap: "wrap",
              position: "fixed",
              bottom: "80px",
              left: "50%",
              transform: "translateX(-50%)",
              zIndex: 2,
            }}
          >
            <SuggestedPrompts prompts={prompts} onSelect={handlePromptSelect} />
          </Box>
        </Box>

        <Box
          sx={{
            width: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "15px 0",
            backgroundColor: "#f5f5f5",
            position: "fixed",
            bottom: 0,
            left: 0,
            zIndex: 1,
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              width: "100%",
              maxWidth: "900px",
              gap: "10px",
            }}
          >
            <NewTopicButton onNewTopic={handleNewTopic} />

            <Box
              sx={{
                flexGrow: 1,
                minWidth: "300px",
                maxWidth: "600px",
                margin: "0 0",
              }}
            >
              <ChatInput onSend={sendMessage} />
            </Box>

            <FeedbackButton />
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default App;
