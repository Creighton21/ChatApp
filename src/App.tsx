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

  const sendMessage = (message: string) => {
    setMessages([...messages, { text: message, sender: "user" }]);

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
        {/* Main Chat Area */}
        <Box
          sx={{
            flexGrow: 1,
            display: "flex",
            flexDirection: "column",
            boxSizing: "border-box",
            padding: "20px",
            paddingBottom: "200px", // Increased padding to make space for prompts
          }}
        >
          {/* Chat History */}
          <Box
            sx={{
              flexGrow: 1,
              overflowY: "scroll",
              maxHeight: "calc(100vh - 300px)", // Adjusted height to make room for suggested prompts
              "&::-webkit-scrollbar": { display: "none" },
              "-ms-overflow-style": "none",
              scrollbarWidth: "none",
            }}
          >
            <ChatHistory messages={messages} onFeedback={handleFeedback} />
          </Box>

          {/* Suggested Prompts */}
          <Box
            sx={{
              width: "100%",
              padding: "10px 0",
              display: "flex",
              justifyContent: "center",
              gap: "10px",
              flexWrap: "wrap", // Enable wrapping of prompts
              position: "fixed", // Fix position above the chat input
              bottom: "80px", // Adjusted to be above the chat input area
              left: "50%",
              transform: "translateX(-50%)", // Center horizontally
              zIndex: 2, // Ensure it stays above other components
            }}
          >
            <SuggestedPrompts prompts={prompts} onSelect={handlePromptSelect} />
          </Box>
        </Box>

        {/* Chat Input Area */}
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
            zIndex: 1, // Ensure chat input stays above the chat history
          }}
        >
          {/* Input Area Container */}
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

            {/* Centered Chat Input */}
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
