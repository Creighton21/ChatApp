// src/components/ClearChatButton.tsx
import React from "react";
import { Button } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

const ClearChatButton: React.FC<{ onClear: () => void }> = ({ onClear }) => {
  return (
    <Button
      variant="outlined"
      startIcon={<DeleteIcon />}
      onClick={onClear}
      sx={{ flexShrink: 0 }} // Prevents shrinking
    >
      Clear Chat
    </Button>
  );
};

export default ClearChatButton;
