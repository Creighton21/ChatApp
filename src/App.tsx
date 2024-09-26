import React, { useState } from "react";
import { Box } from "@mui/material";
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

  // Function to simulate sending a message
  const sendMessage = (message: string) => {
    // Add user's message
    setMessages([...messages, { text: message, sender: "user" }]);

    // Simulate AI response with the image and references
    setTimeout(() => {
      const aiResponse: Message = {
        text: "Here are some images for your inspiration.",
        sender: "ai",
        imageList: [
          {
            url: "https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxMjA3fDB8MXxhbGx8fHx8fHx8fHwxNjI2NzQ4NzMz&ixlib=rb-1.2.1&q=80&w=400",
            source: "source1.com",
          },
          {
            url: "https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxMjA3fDB8MXxhbGx8fHx8fHx8fHwxNjI2NzQ4NzMz&ixlib=rb-1.2.1&q=80&w=400",
            source: "source2.com",
          },
          {
            url: "https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxMjA3fDB8MXxhbGx8fHx8fHx8fHwxNjI2NzQ4NzMz&ixlib=rb-1.2.1&q=80&w=400",
            source: "source3.com",
          },
        ],
        references: [
          {
            title: "Source 1",
            documentUrl: "1.pdf",
          },
          {
            title: "Source 2",
            documentUrl: "2.pdf",
          },
        ],
        feedback: null,
      };
      setMessages((prev) => [...prev, aiResponse]);
    }, 1000);
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
