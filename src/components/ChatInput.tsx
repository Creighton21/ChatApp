// src/components/ChatInput.tsx
import React, { useState } from "react";
import { Box, TextField, IconButton, InputAdornment } from "@mui/material";
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
    <Box sx={{ display: "flex", alignItems: "center", width: "100%" }}>
      <TextField
        fullWidth
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Ask me anything..."
        onKeyDown={handleKeyPress} // Handle Enter key press
        InputProps={{
          sx: {
            borderRadius: "20px", // Rounded corners
            padding: "10px",
          },
          endAdornment: (
            <InputAdornment position="end">
              <IconButton onClick={handleSend} disabled={!message.trim()}>
                <SendIcon />
              </IconButton>
            </InputAdornment>
          ),
        }}
      />
    </Box>
  );
};

export default ChatInput;
