// src/components/ChatInput.tsx
import React, { useState } from "react";
import { Box, TextField, IconButton } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";

const ChatInput: React.FC<{ onSend: (message: string) => void }> = ({
  onSend,
}) => {
  const [message, setMessage] = useState("");

  const handleSend = () => {
    if (message.trim()) {
      onSend(message);
      setMessage(""); // Clear input after sending
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && message.trim()) {
      e.preventDefault(); // Prevent newline in TextField
      handleSend();
    }
  };

  return (
    <Box sx={{ display: "flex", alignItems: "center" }}>
      <TextField
        fullWidth
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Type your message..."
        onKeyDown={handleKeyPress} // Handle Enter key press
      />
      <IconButton
        onClick={handleSend}
        color="primary"
        disabled={!message.trim()}
      >
        <SendIcon />
      </IconButton>
    </Box>
  );
};

export default ChatInput;
